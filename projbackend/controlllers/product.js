const Product = require("../models/product")


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