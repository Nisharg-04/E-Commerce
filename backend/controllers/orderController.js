const Product = require("../models/productModal");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Order = require("../models/orderModal");

//Create New Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

// get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 401));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//Get Logged in user Order
exports.myOrders = catchAsyncError(async (req,res,next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders,
  });
});



//Get All Orders--Admin
exports.getAllOrders = catchAsyncError(async (req,res,next) => {
  const orders = await Order.find();

let totalAmount=0;

orders.forEach((order)=>{
  totalAmount+=order.totalPrice;
});
  res.status(200).json({
    success: true,
    orders,
    totalAmount
  });
});


//Update order Status--Admin
exports.updateOrder = catchAsyncError(async (req,res,next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 401));
  }
if(order.orderStatus==="Delivered"){
  return next(new ErrorHandler("Your Order Is Already Delivered This Order",400));
}
order.orderItems.forEach(async(o)=>{
  await updateStock(o.product,o.quantity);
})

order.orderStatus=req.body.status;
if(req.body.status==="Delivered"){
  order.deliveredAt=Date.now();
}
await order.save({validateBeforeSave:false});

  res.status(200).json({
    success: true,
  });
});


async function updateStock(id,quantity){
  const product =await Product.findById(id);
  product.stock-=quantity;
 await product.save({validateBeforeSave:false});

}




//Delete Order ---Admin
exports.deleteOrder = catchAsyncError(async (req,res,next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 401));
  }

  await order.deleteOne();
  res.status(200).json({
    success: true,
  });
});