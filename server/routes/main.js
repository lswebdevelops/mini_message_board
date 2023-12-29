const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

    const locals = {
        title: 'Mini Messageboard',
        description: "Simple Messageboard created with NojeJs, Express & MongoDb."
    }

  res.render("index", locals);
});
router.get("/about", (req, res) => {
  res.render("about");
});
router.get("/contact", (req, res) => {
  res.render("contact");
});

module.exports = router;
