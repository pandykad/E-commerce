const Category = require("../models/category")


exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) =>{  //database callback function alwys returns 2 thing : 1.err, 2.needed object i.e. here the category
        if(err){
            return res.status(400).json({
                error: "No category was found in DB"
            })
        }
       req.profile = cate //category is assigned
       next()
    })
    
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body)       // category is the object created
    category.save((err, category) => {            // category is the object we just created, thus we are not using the model name here
        if(err){
            return res.status(400).json({
                error: "NOT able to save category in DB"
            })
        }
        return res.json(category)
    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category)
}

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err){
            return res.status(400).json({
                error: "NO category was found !"
            })
        }
        res.json(categories)
    })
}

exports.updateCategory = ((req, res) => {
    const category = req.category           //re.category is from the param  
    category.name = req.body.name           //req.body.name is from the frontend

    category.save((err, updatedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Failed to update category !"
            })
        }
        res.json(updatedCategory)
    })
})

exports.removeCategory = ((req, res) => {
    const category = req.category

    category.remove((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete category !"
            })
        }
        res.json({
            message: "Successsfully deleted" 
        })
    })
})