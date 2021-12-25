const express = require("express");
const cors = require("cors");

require("./database/db.js");
const bodyParser = require("body-parser");

const userRoute = require("./routers/userRoute.js");
const itemRoute = require("./routers/itemRouter");
const selectedRoute = require("./routers/selectedRouter");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/items", express.static(__dirname + "/items"));

app.use(userRoute);
app.use(selectedRoute);
app.use(itemRoute);

app.listen(90);
