// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { HoldingsModel } = require("./Models/HoldingsModel");
const { PositionsModel } = require("./Models/PositionsModel");
const { OrdersModel } = require("./Models/OrdersModel");

const authRoutes = require("./routes/AuthRoute");
const authMiddleware = require("./middleware/authMiddleware");
const bodyParser = require("body-parser");
const { getUserProfile} = require("./controllers/authController");

// const PORT = process.env.PORT || 3002;
// const uri = process.env.MONGO_URL ;
const app = express();



app.set("port", (process.env.PORT || 3002))

// dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);



  app.get("/allHoldings", async (req, res) => {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  });

  app.get("/allPositions", async (req, res) => {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
});

   app.post("/newOrder", async (req, res) => {
   let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  newOrder.save();

  res.send("Order saved!");
});

//     app.listen( PORT , () => {
//     console.log("app started");
//     mongoose.connect(uri);
//     console.log("db connected");
// })


const start = async () => {
  app.set("mongo_user")
  const connectionDb = await mongoose.connect("mongodb+srv://rudranshshisodia99:Rudransh@zerodhaclonecluster.jahua.mongodb.net/zerodha?retryWrites=true&w=majority&appName=zerodhacloneCluster")

  console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
  app.listen(app.get("port"), () => {
      console.log("LISTENIN ON PORT 3002")
  });



}
start();