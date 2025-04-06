const express =require('express');
const urlRoutes =require("./routes/url");
const {connectToMongodb}=require("./connect");
const {handelGenerateNewShortUR}=require("./controllers/url");

const app =express();
const PORT =8001;

connectToMongodb('mongodb://localhost:27017/short-url')
.then(()=>console.log("Mongodb connected"));
//middleware
app.use(express.json());

app.use("/url",urlRoutes)


app.listen(PORT,()=>console.log(`server started at port :${PORT}`));