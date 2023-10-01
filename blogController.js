const Blog = require("../models/blogSchema");
const scraper = require("../models/linekinSchema");
//we going to use blog_index,blog_details,blog_create_get,blog_create_post,blog_delete

//first w e create the function..
const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog details" });
    })
    .catch((err) => {
      rs.status(404);
    });
};
const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create a new Blog" });
};
const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};
// -----------linkedin -post///
const linkedInPost = (req, res) => {
  const postData = new scraper(req.body);

  postData
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

///////
const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  linkedInPost,
  blog_delete,
};
