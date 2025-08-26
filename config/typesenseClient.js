const typesense=require('typesense');

const client=new typesense.Client({

    nodes:[

        {
            host:'localhost',
            port:8108,
            protocol:'http'
        },

       
    ],

     apiKey:'xyz123',
     connectionTimeoutSeconds:2 ,
});

module.exports=client;