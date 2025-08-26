const ProductModel = require('../models/ProductModel');
const typesense = require('../config/typesenseClient');



exports.createCollection = async (req, res,next) => {
  const schema = {
    name: 'products',
    fields: [
      { name: 'name', type: 'string' },
      { name: 'price', type: 'string' },
      { name: 'desription', type: 'string' }, 
      { name: 'image', type: 'string[]' },
      { name: 'category', type: 'string' },
      { name: 'stock', type: 'string' },
      {name:'user', type:'string'},
    ],
    
  };

  try {
    const result = await typesense.collections().create(schema);
    res.json({ message: 'Collection created', result });
  } catch (e) {
    if (e.message.includes('already exists')) {
      res.status(400).json({ message: 'Collection already exists' });
    } else {
      console.error('Create collection error:', e);
      res.status(500).json({ message: 'Failed to create collection' });
    }
  }
};





exports.importToTypesense = async (req, res,next) => {
  try {
    const products = await ProductModel.find();

    const typesenseData = products.map(p => ({
      id: p._id.toString(),
      name: p.name,
      price: p.price,
      desription: p.desription,
      image: p.image.map(img => img.image),
      category: p.category,
      stock: p.stock
    }));

    const result = await typesense
      .collections('products')
      .documents()
      .import(typesenseData, { action: 'upsert' });

    console.log(result);
    res.json({ message: 'Products imported', result });
  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ message: 'Failed to import products into Typesense' });
  }
};





exports.searchProducts = async (req, res,next) => {
  const { q = '*' ,page=1 ,per_page=8 } = req.query;

  try {
    const searchResults = await typesense
      .collections('products')
      .documents()
      .search({
        q,
        query_by: 'name,category,desription,price',
        page:parseInt(page),
        per_page: parseInt(per_page)
      });

    res.json({products:searchResults.hits.map(hit => hit.document),
      totalHits:searchResults.found,
      currentPage:searchResults.page,
      totalPages:Math.ceil(searchResults.found/per_page),
    });
  } catch (e) {
    console.error('Search error:', e);
    res.status(500).json({ message: 'Search failed' });
  }
};


exports.getProducts = async (req, res,next) => {
  try {
    const products = await ProductModel.find();
    res.json({ message: 'getProductsworking', products });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
};


exports.createProducts = async (req, res, next) => {
  try {
    const { name, price, description, image, category, stock } = req.body;

    
    const product=ProductModel.create({
      name,
      price,
      description,
      image,
      category,
      stock,
      user:req.user.id,
    });


    await typesense.collections('products').documents().create({

      id:product._id.toString(),
      name:product.name,
      price: product.price,
      desription:product.desription,
      image:product.image.map(img=>img.image),
      category: product.category,
      stock: product.stock,
      user: product.user.toString(),
    })

    res.status(201).json({ message: "Successfully created record", product });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Failed to create record" });
  }
};


exports.getSingleProduct = async (req, res,next) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error });
  }
};




exports.deleteProduct =async (req,res,next)=>{

  const product=await ProductModel.findByIdAndDelete(req.params.id);

  if(!product){
     res.status(404).json({
      message:'produc not found'
    });

    await typesense.collections('products').documents(product._id.toString()).delete();
  }

  res.json({
    message:"product deleted sucessfully"
  })
}


exports.updateProduct =async(req,res)=>{
  try{

    const productId=req.params.id;
    const{name,price,desription,image,category,stock}=req.body;

    const updatedProduct=await ProductModel.findByIdAndUpdate(
      productId,
      {name,price,desription,image,category,stock},
      {new:true,runValidators:true}
    );

    if(!updatedProduct){

      res.status(404).json({message:"Product not found"})
    }

    await typesense.collections('products').documents().upsert({
      id:updatedProduct._id.toString(),
      name:updatedProduct.name,
      price:updatedProduct.price,
      desription:updatedProduct.desription,
      image: updatedProduct.image.map(img => img.image),
      category:updatedProduct.category,
      stock:updatedProduct.stock,
      user:updatedProduct.user? updatedProduct.user.toString():undefined,

    });

    res.json({message:"product updated sucessfully",updatedProduct});




  }catch(error){

    res.json({message:"failed to update product"});
  }
}


