const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:String,
    price:String,
   desription:String,
    image:[
        {
            image:String,
        }
    ],
    category:String,
    
    stock:String,

    user:{
        type:mongoose.Schema.Types.ObjectId,
    }

})

const productmodel=mongoose.model('product',productSchema);
module.exports=productmodel;
