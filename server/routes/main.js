const express = require("express");
const router = express.Router();

const Message = require("../models/Message");
/**
 * get/
 * home
 */

router.get("/", async (req, res) => {
  const locals = {
    title: "Mini Messageboard",
    description: "Simple Messageboard created with NojeJs, Express & MongoDb.",
  };
  try {
    const data = await Message.find();
    res.render("index", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

/**
 * get/
 * about
 */
router.get("/about", (req, res) => {
  res.render("about");
});

/**
 * get/
 * contact
 */
router.get("/contact", (req, res) => {
  res.render("contact");
});

// inserting data 

function insertMessageData () {
  Message.insertMany([
    {
      username: "third user ",
      message: "just a message"
    },
    {
      username: "4th user ",
      message: "just a message"
    },
    {
      username: "5th user ",
      message: "just a message"
    },
    {
      username: "6th user ",
      message: "just a message"
    },
    {
      username: "7th user ",
      message: "just a message"
    },
    {
      username: "8th user ",
      message: "just a message"
    },
  ])
}
// uncomment to add data
// insertMessageData()
module.exports = router;
