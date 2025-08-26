const mongoose=require('mongoose');

const orderSchema =mongoose.Schema({

    shippingInfo:{

        address:{
            type:String,
            required:true
        },
         country:{
            type:String,
            required:true
        },
         city:{
            type:String,
            required:true
        },
         postalcode:{
            type:String,
            required:true
        },
         phoneNo:{
            type:String,
            required:true
        },

    },
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'User'
    },

    orderItems:[{
name:{

    type:String,
    required:true
},
quantity:{
    type:Number,
    required:true
},
images:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
product:{
    type:mongoose.SchemaTypes.ObjectId,
    required:true,
    ref:'product'
}
    }],
    itemsPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    taxPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    shippingPrice:{
        type:Number,
        required:true,

    },
    totalprice:{
        type:Number,
        required:true,
        default:0.0
    },
    paidAt:{
        type:Date,

    },
    deliveredAt:{
        type:Date
    },
    orderStatus:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const orderModel =mongoose.model('Order',orderSchema);
module.exports=orderModel;