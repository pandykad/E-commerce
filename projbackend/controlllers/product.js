const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")
const { runInNewContext } = require("vm")


exports.getProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) =>{  //database callback function alwys returns 2 thing : 1.err, 2.needed object i.e. here the product
        if(err){
            return res.status(400).json({
                error: "No category was found in DB"
            })
        }
       req.profile = product //product is assigned
       next()
    })
    
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm()       // category is the object created
    form.keepExtensions =true

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Problem with the image !"
            })
        }
        //destructure the fields
        const {name, description, price, category, stock } = fields

        //restrictions
        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock 
        ){
            return res.status(400).json({
                error: "Please include all fields !"
            })
        }
            
       
        let product = new Product(fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size too big !"
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type        
        }

        //save in db
        product.save((err, product) =>{
            if(err){
                res.status(400).json({
                    err:"Product save failed !"
                })
            }
            res.json(product)
        })

    })
}


exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

//middleware
exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.deleteProduct = ((req, res) => {
    let product = req.product

    product.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete product !"
            })
        }
        res.json({
            message: "Successsfully deleted",
            deletedProduct 
        })
    })
})

//
exports.updateProduct = ((req, res) => {

    let form = new formidable.IncomingForm()       // category is the object created
    form.keepExtensions =true

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Problem with the image !"
            })
        }
        //destructure the fields
        const {name, description, price, category, stock } = fields

        //restrictions
        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock 
        ){
            return res.status(400).json({
                error: "Please include all fields !"
            })
        }
            
        //updation code
        let product = new Product(fields)
        product = _.extend(product, fields)



        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size too big !"
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type        
        }

        //save in db
        product.save((err, product) =>{
            if(err){
                res.status(400).json({
                    err:"Product updation failed !"
                })
            }
            res.json(product)
        })

    })

})

exports.getAllProduct = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8 
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) =>{
        if(err){
            return res.status(400).json({
                error: "NO product FOUND !"
            })
        }
        res.json(products)
    })
}

exports.getAllUniqueCategories = (req, res) =>{
    Product.distinct("category", {}, (err, category) => {
        if(err){
            res.status(400).json({
                err:"NO category found !"
            })
        }
        res.json(category)
    })
}






exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne:{
                filter: {_id: prod._id},
                update: {$inc : {stock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if(err){
            return res.status(400).json({
                error: "Bulk operation failed !"
            })
        }
        next()
    })

}