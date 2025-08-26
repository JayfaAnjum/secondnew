const User = require('../models/UserModel'); 

const Product = require('../models/ProductModel');
const Order= require('../models/OrderModel');


exports.newOrder= async (req,res,next)=>{

const{
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    orderStatus,
    totalprice,
    payementInfo
}=req.body

   const order=await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalprice,
    orderStatus,
    payementInfo,
    paidAt:Date.now(),
    user:req.user.id//we can get it from the isAuthenticated method
   })
 res.status(200).json({

        sucess:true,
        message:'new order is created succesfully',
        order
    })

}

exports.getSingleOrder=async(req,res,next)=>{

    const order=await Order.findById(req.params.id).populate('user','name email');

    if(!order){
        res.json({message:"there is no such order"});
    }
res.json({message:'order sucessfully got',order});

}

exports.myorder=async(req,res,next)=>{

    const orders=await Order.find({user: req.user.id});

    if(!orders){
        res.json({message:"there is no such order"});
    }
res.json({message:'order sucessfully got',orders});
}

exports.orders=async(req,res,next)=>{

    const orders=await Order.find({});

    

    if(!orders){
        res.json({message:"there is no such order"});
    }

    let totalamount=0;

    orders.forEach(element => {
       totalamount+=element.totalprice;
    });
res.json({

    sucess:true,
        totalamount,
        orders
});
}

exports.updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.orderStatus === 'Delivered') {
    return res.status(400).json({ message: "Order has already been delivered" });
  }

  // ✅ Wait for all stock updates
 
   await order.orderItems.map(item =>
      updateStock(item.product, item.quantity)
    )
  

  order.orderStatus = req.body.orderStatus;
  order.deliveredAt = Date.now();
  await order.save();

  res.json({ message: "Order updated and stock adjusted successfully" });
};


async function updateStock(productId, quantity) {
  const product1 = await Product.findById(productId);

  

  const currentStock = parseInt(product1.stock, 10);
  const updatedStock = currentStock - quantity;

  product1.stock = updatedStock.toString();
   product1.save({ validateBeforeSave: false });
}


exports.deleteOrder=async(req,res,next)=>{

    const order=await Order.findById(req.params.id);

    if(!order){
        res.json({message:"there is no such order"});
    }
    await order.remove();


res.json({message:'order delete sucessfully got',order});

}