const express = require("express");
const router = express.Router();

const Message = require("../models/Message");
/**
 * get/
 * home
 */

router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "Mini Messageboard",
      description:
        "Simple Messageboard created with NojeJs, Express & MongoDb.",
    };
    // const data = await Message.find();

    let perPage = 6;
    let page = req.query.page || 1

    const data = await Message.aggregate( [ { $sort: { createdAt: -1 }}])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const count = await Message.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage)

    res.render("index", { 
      locals, 
      data, 
      current: page, 
      nextPage: hasNextPage ? nextPage : null
    
    });
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

// function insertMessageData() {
//   Message.insertMany([
//     {
//       username: "third user ",
//       message: "just a message",
//     },
//     {
//       username: "10th user ",
//       message: "just a message",
//     },
//     {
//       username: "11th user ",
//       message: "just a message",
//     },
//     {
//       username: "12th user ",
//       message: "just a message",
//     },
//     {
//       username: "13th user ",
//       message: "just a message",
//     },
//     {
//       username: "14th user ",
//       message: "just a message",
//     },
//   ]);
// }
// uncomment to add data
// insertMessageData()
module.exports = router;
