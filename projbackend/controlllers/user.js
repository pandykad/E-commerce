const User = require("../models/user")
const Order = require("../models/order")





exports.getUserById = (req, res, next, id) => {
     User.findById(id).exec((err, user) =>{  //database callback function alwys returns 2 thing : 1.err, 2.needed object i.e. here the user
         if(err || !user){
             return res.status(400).json({
                 error: "No user was found in DB"
             })
         }
        req.profile = user //user is assigned
        next()
     })
     
}

exports.getAllUsers = (req, res) => { // Excersice
    User.find().exec((err, user) =>{
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        return res.json(user) 
    })
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user) =>{
            if(err){
                return res.status(400).json({
                    error: "You are not auth to update data !"
                })
            }
            user.salt = undefined
            user.encry_password = undefined
            res.json(user)
        }

    )
}


exports.userPurchaseList = (res, req) => {
    Order.find({user: req.profile._id})
    .populate("user","_id name" ) // populate helps to do cross connection b/w different models i.e. order and user
    .exec((err, order ) =>{
        if(err){
            return res.status(400).json({
                error: "No Order in this account !"
            })
        }
        return res.json(order)
    })
}

exports.pushOrderInPurchaseList = (res, req, next) => {
   let purchase = []
   req.body.order.products.forEach(product => { 
       puchases.push({
           _id: products._id,
           name: product.name,
           description: product.description,
           category: product.category,
           quantity: product.quantity,
           amount: req.body.order.amount,
           transaction_id: req.body.order.transaction_id
       })
   })
   
   //store this in DB
   User.findOneAndUpdate(
       {_id: req.profile._id},
       {$push: {purchases: purchases}},
       {new: true},
       (err, purchases) => {
           if(err){
               return res.status(400).json({
                   error: "Unable to save purchase list !"
               })
           }
           next()
       }
   )
   
   
}







exports.getUser = (req, res) => {
    req.profile.salt = undefined // Making salt field unvisible to the GET req
    req.profile.encry_password = undefined // same for password
    return res.json(req.profile) //provides the user from the above function
}