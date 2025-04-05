const mongoose=require('mongoose');

//ceate the schema 
const urlSchema =new mongoose.Schema(
    {
        sortId:{
            type :String,
            required :true,
            unique :true,
        },
        redirectURL :{
            type :String,
            required :true,

        },
        visitHistory: [{
            timestamp:{
                type:Number,
            }
        }], 
    },
        {
            timestamps :true,
        }
);
//schema -- model
const URL =mongoose.model("url",urlSchema);
module.exports =URL;