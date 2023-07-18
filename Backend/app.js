// <-- Imports -->
const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

// <-- Configuration --> 
dotenv.config();

const app = express();
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('trust proxy', 1);
app.use(cors({origin : '*'}));

// <-- Import Routes -->
const Users = require("./routes/Users.route");
const Products = require("./routes/Products.route");
const Profiles = require("./routes/Profiles.route");
const Downloads = require("./routes/Downloads.route");

// <-- Configure Routes -->
app.use('/api/users', Users);
app.use('/api/products', Products);
app.use('/api/profiles', Profiles);
app.use('/api/downloads', Downloads);

// <-- -->
app.listen(process.env.SERVER_PORT_NO, () => {
    console.log("Server Started at Port: http://localhost:" + process.env.SERVER_PORT_NO);
});