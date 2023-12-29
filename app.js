require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");

const app = express();
const PORT = 5000 || process.env.PORT;

// templating engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// setting public folder

app.use(express.static("public"));

app.use("/", require("./server/routes/main"));

app.listen(PORT, () => {
  console.log(`app listens on port: ${PORT}`);
});
