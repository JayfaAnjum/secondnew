const mongoose=require('mongoose');

const connectDatabase= async ()=>{
try{
await mongoose.connect(process.env.DB_URL)
console.log("sucessfully connection done");
}

catch(error){
    console.log(error);
}

}

module.exports=connectDatabase;