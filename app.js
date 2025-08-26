const express=require('express');

const app=express();
const path=require('path');

const connectDatabase=require('./config/ConnectDatabase');
const cors=require('cors');
const dotenv=require('dotenv');
const product=require('./routes/product.js');
const order=require('./routes/order.js');
const auth=require('./routes/auth.js');

const cookieParser = require('cookie-parser');





dotenv.config({path:path.join(__dirname,'config','config.env')});
connectDatabase();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));


app.use(cookieParser());


app.use('/api/v1/',product);
app.use('/api/v2/',order);

app.use('/auth/',auth);



app.listen(process.env.PORT,() => {
    console.log(
        `my server is running on ${process.env.PORT} port in prodution`);
});

