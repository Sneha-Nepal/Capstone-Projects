import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let postArray = [];

app.get("/", (req, res) => {
    res.render("home.ejs", {posts : postArray});
});

app.get("/about", (req, res) =>{
    res.render("about.ejs");
});

app.post("/compose-a-post", (req,res) => {
   const blogContent = {
    blogTitle : req.body.title,
    blogAuthor : req.body.name,
    blogEmail : req.body.email,
    blogSocials : req.body.socials || [], 
    blogImg : req.body.imgURL,
    blogBody : req.body.content,
    publishDate: new Date().toLocaleDateString(),
   } 
   postArray.unshift(blogContent);
    res.redirect("/");
});

app.get("/compose" , (req,res) => {
    res.render("compose.ejs");
});

app.get("/post/:index", (req, res) =>{
    let index = req.params.index;
    let singlePost = postArray[index];
    res.render("post.ejs", {onePost : singlePost, index: index});
});

app.get("/edit/:index", (req, res)=>{
    let index = req.params.index;
    let singleForm = postArray[index];
    res.render("edit.ejs", {oneForm : singleForm, index : index});
});

app.post("/update/:index", (req,res) =>{
    let index = req.params.index;
    let newData = req.body;
    postArray[index].blogTitle = newData.title;
    postArray[index].blogAuthor = newData.name;
    postArray[index].blogEmail = newData.email;
    postArray[index].blogSocials = newData.socials || [];
    postArray[index].blogImg = newData.imgURL;
    postArray[index].blogBody = newData.content;
    res.redirect("/");

});

app.post("/delete/:index", (req, res)=>{
    let index = req.params.index;
    postArray.splice(index, 1);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});