const express =require('express');
const urlRoutes =require("./routes/url");
const {connectToMongodb}=require("./connect");
const {handelGenerateNewShortUR}=require("./controllers/url");
const URL = require('./models/url'); 

const app =express();
const PORT =8001;

connectToMongodb('mongodb://localhost:27017/short-url')
.then(()=>console.log("Mongodb connected"));
//middleware
app.use(express.json());

app.use("/url",urlRoutes)

//shortid-redirect
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
  
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
  
    res.redirect(entry.redirectURL);
  });
  
  // Simple hello route
app.get('/hello', (req, res) => {
  res.send('Hello, welcome to my URL shortener app');
});


app.listen(PORT,()=>console.log(`server started at port :${PORT}`));