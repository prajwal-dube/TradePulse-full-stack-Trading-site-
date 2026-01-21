require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
const cors = require("cors");

const {HoldingsModel} = require('./model/HoldingsModel');

const {PositionsModel} = require('./model/PositionsModel');

const {OrdersModel} = require('./model/OrdersModel');


const PORT = process.env.PORT || 3002;
const URL = process.env.MONGO_URL;


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("TradePulse backend is running");
});


// Adding holdings data to  collection (Mongoose) like Dummy Data . 
// app.get("/addHoldings",async(req, res) => {
//    let tempHoldings =  [
//   {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//     isLoss: true,
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",
//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//     isLoss: true,
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//     isLoss: true,
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//     isLoss: true,
//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//     isLoss: true,
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//   },
// ];
//    tempHoldings.forEach((item)=> {
//      let newHolding = new HoldingsModel({
          // name: item.name,
          // qty: item.qty,
          // avg: item.avg,
          // price: item.price,
          // net: item.net,
          // day: item.day,
//     });
//        newHolding.save();
//  });
//     res.send("Done!");
// });



// Adding Positions Data to collection (Mongoose) like Dummy Data .
// app.get("/addPositions", async(req,res) => {
//     let tempPositions = [
//   {
//     product: "CNC",
//     name: "TCS",
//     qty: 4,
//     avg: 3150.0,
//     price: 3202.45,
//     net: "+1.66%",
//     day: "+0.42%",
//     isLoss: false,
//   },
//   {
//     product: "CNC",
//     name: "INFY",
//     qty: 5,
//     avg: 1540.3,
//     price: 1555.4,
//     net: "+0.98%",
//     day: "+0.25%",
//     isLoss: false,
//   },
//   {
//     product: "MIS",
//     name: "RELIANCE",
//     qty: 6,
//     avg: 2100.5,
//     price: 2112.4,
//     net: "+0.57%",
//     day: "+1.44%",
//     isLoss: false,
//   },
//   {
//     product: "MIS",
//     name: "HDFC",
//     qty: 3,
//     avg: 2560.1,
//     price: 2544.75,
//     net: "-0.60%",
//     day: "-0.25%",
//     isLoss: true,
//   },
//   {
//     product: "NRML",
//     name: "NIFTY24OCTFUT",
//     qty: 50,
//     avg: 22455.25,
//     price: 22490.10,
//     net: "+0.15%",
//     day: "+0.09%",
//     isLoss: false,
//   },
//   {
//     product: "NRML",
//     name: "BANKNIFTY24OCTFUT",
//     qty: 25,
//     avg: 47520.45,
//     price: 47410.25,
//     net: "-0.23%",
//     day: "-0.10%",
//     isLoss: true,
//   },
//   {
//     product: "BO",
//     name: "ITC",
//     qty: 7,
//     avg: 448.3,
//     price: 454.9,
//     net: "+1.47%",
//     day: "+0.55%",
//     isLoss: false,
//   },
//   {
//     product: "BO",
//     name: "TATAMOTORS",
//     qty: 10,
//     avg: 875.75,
//     price: 868.25,
//     net: "-0.85%",
//     day: "-0.40%",
//     isLoss: true,
//   },
//   {
//     product: "CO",
//     name: "SBIN",
//     qty: 15,
//     avg: 646.25,
//     price: 655.4,
//     net: "+1.42%",
//     day: "+0.50%",
//     isLoss: false,
//   },
//   {
//     product: "CO",
//     name: "ADANIPORTS",
//     qty: 6,
//     avg: 1220.8,
//     price: 1210.2,
//     net: "-0.86%",
//     day: "-0.30%",
//     isLoss: true,
//   },
//   {
//     product: "MIS",
//     name: "ONGC",
//     qty: 12,
//     avg: 115.8,
//     price: 116.8,
//     net: "+0.86%",
//     day: "-0.09%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "HUL",
//     qty: 3,
//     avg: 500.0,
//     price: 512.4,
//     net: "+2.48%",
//     day: "+1.04%",
//     isLoss: false,
//   },
//   {
//     product: "NRML",
//     name: "USDINR24OCTFUT",
//     qty: 1000,
//     avg: 83.12,
//     price: 83.05,
//     net: "-0.08%",
//     day: "-0.02%",
//     isLoss: true,
//   },
//   {
//     product: "BO",
//     name: "LT",
//     qty: 4,
//     avg: 3655.6,
//     price: 3690.0,
//     net: "+0.94%",
//     day: "+0.25%",
//     isLoss: false,
//   },
//   {
//     product: "CO",
//     name: "BPCL",
//     qty: 8,
//     avg: 495.8,
//     price: 492.3,
//     net: "-0.71%",
//     day: "-0.18%",
//     isLoss: true,
//   },
// ];
//     tempPositions.forEach((item) => {
//       let newPositions = new PositionsModel ({
//           product: item.product,
//           name: item.name,
//           qty: item.qty,
//           avg: item.avg,
//           price: item.price,
//           net: item.net,
//           day: item.day,
//           isLoss: item.isLoss,
//       });
//         newPositions.save();
//     });
//         res.send("Done!");
// });



app.get('/allHoldings', async(req,res) => {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
});

app.get('/allPositions', async(req,res) => {
    let allPositons = await PositionsModel.find({});
    res.json(allPositons);
})

app.get('/allOrders', async(req,res) => {
    let allOrders = await OrdersModel.find({});
    res.json(allOrders);
})


app.post("/newOrder", async(req,res) => {
    let newOrder = new OrdersModel({
      name : req.body.name,
      qty : req.body.qty,
      price : req.body.price,
      mode : req.body.mode,
    });

    await newOrder.save();

    res.send("order saved");
});



mongoose.connect(URL)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
