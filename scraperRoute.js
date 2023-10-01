const express = require("express");
const blogController = require("../mvc/blogController");
const router = express.Router();

//blogs routes..

/////

//creating a post request..

//creating a post request..
router.get("/", blogController.linkedInPost);
//geting id:,

//creating an handler for delete request..

module.exports = router;
