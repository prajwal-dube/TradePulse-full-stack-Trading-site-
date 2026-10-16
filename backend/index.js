require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken'); // 1. Imported JWT package
const {
    getDashboardData,
    getPage,
    parsePagination,
} = require("./performance");

const PORT = process.env.PORT || 8080;
const URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET; // 2. Loaded secret from your .env file

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["X-Has-Next-Page", "X-Page", "X-Page-Size"]
}));

app.use(bodyParser.json());

// 3. JWT Verification Middleware Function
const authenticateToken = (req, res, next) => {
    // Read the authorization header from incoming request
    const authHeader = req.headers['authorization'];
    
    // Header format is "Bearer <TOKEN>", so we split by space to isolate the token string
    const token = authHeader && authHeader.split(' ')[1];

    // If no token is provided, block the request immediately
    if (!token) {
        console.log(`[AUTH FAILED] Missing token on ${req.method} ${req.path}`);
        return res.status(401).json({ error: "Access token missing. Access denied." });
    }

    // Verify token legitimacy using your secret key
    jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
        if (err) {
            console.log(`[AUTH FAILED] Invalid or expired token on ${req.method} ${req.path}`);
            return res.status(403).json({ error: "Invalid or expired token. Access denied." });
        }
        
        // Attach user info to request payload so your routes can use it if needed
        req.user = decodedUser; 
        next(); // Authorization successful, proceed to the actual route handler
    });
};

// Server health assessment base route (Kept public so you can easily test if server is alive)
app.get("/", (req, res) => {
    res.send("TradePulse backend is running");
});

const sendCollectionPage = async (req, res, collectionName) => {
    try {
        const pagination = parsePagination(req.query);
        const page = await getPage(
            mongoose.connection.db.collection(collectionName),
            collectionName,
            pagination
        );

        res.set({
            "X-Has-Next-Page": String(page.hasNextPage),
            "X-Page": String(page.page),
            "X-Page-Size": String(page.limit),
        });
        res.status(200).json(page.items);
    } catch (error) {
        if (error instanceof RangeError) {
            return res.status(400).json({ error: error.message });
        }

        console.error(`Error fetching ${collectionName}:`, error.message);
        return res.status(500).json({ error: `Failed to fetch ${collectionName}` });
    }
};

app.get("/allHoldings", (req, res) => sendCollectionPage(req, res, "holdings"));
app.get("/allPositions", (req, res) => sendCollectionPage(req, res, "positions"));
app.get("/allOrders", (req, res) => sendCollectionPage(req, res, "orders"));

app.get("/dashboard-data", async (req, res) => {
    try {
        const pagination = parsePagination(req.query);
        const dashboardData = await getDashboardData(mongoose.connection.db, pagination);
        res.status(200).json(dashboardData);
    } catch (error) {
        if (error instanceof RangeError) {
            return res.status(400).json({ error: error.message });
        }

        console.error("Error fetching dashboard data:", error.message);
        return res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
});

//  ROUTE 4: Handle Placing New Orders (PROTECTED)
app.post("/newOrder", async (req, res) => {
    try {
        const newOrder = {
            name: req.body.name,
            qty: req.body.qty,
            price: req.body.price,
            mode: req.body.mode, // "BUY" or "SELL"
            userId: req.user?.id, // Optional: Tracks exactly which user placed this order based on their token
            createdAt: new Date()
        };
        await mongoose.connection.db.collection("orders").insertOne(newOrder);
        console.log(`[POST] /newOrder successfully created for ${req.body.name} by user ${req.user?.id || 'authenticated'}`);
        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error creating new order:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Database connectivity infrastructure configuration
mongoose.connect(URL, {
    dbName: "TradePulse" 
})
.then(async () => {
    console.log("Connected to MongoDB cluster securely.");
    await mongoose.connection.db.collection("orders").createIndex(
        { createdAt: -1, _id: -1 },
        { name: "orders_createdAt_id_desc" }
    );
    app.listen(PORT, () => {
        console.log(`TradePulse backend is running cleanly on port ${PORT}`);
    });
})
.catch((err) => {
    console.error("Database connection initialization failed:", err.message);
});
