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

    let perPage = 4;
    let page = req.query.page || 1;

    const data = await Message.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Message.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const hasPrevPage = page > 1;

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prevPage: hasPrevPage ? page - 1 : null,
    });
  } catch (error) {
    console.log(error);
  }
});
/**
 * get/
 * message: /id
 */
router.get("/message/:id", async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Message.findById({ _id: slug });
    const locals = {
      title: "Message",
      description:
        "Simple Messageboard created with NojeJs, Express & MongoDb.",
    };

    res.render("message", {
      locals,
      data,
    });
  } catch (error) {
    console.log(error);
  }
});
/**
 * post/
 * search
 */
router.post("/search/", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description:
        "Simple Messageboard created with NojeJs, Express & MongoDb.",
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    const data = await Message.find({
      $or: [
        { username: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { message: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });
    res.render('search',  {
      locals,
      data,

    })
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

/**
 * post/
 * add new messages
 */


router.post('/add-message', async (req, res) => {
  try {
    const  { username, message } = req.body;

    // create a new message 
    const newMessage = new Message( {
      username, 
      message,
    });

    // save the message to db 
    await newMessage.save();

    // redirect to the home page 
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
})






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
