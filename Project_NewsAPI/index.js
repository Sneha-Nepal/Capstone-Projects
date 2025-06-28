import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://newsapi.org";
const API_key = " "; //Insert your NewsAPI key here for local testing

app.use(express.static("public"));

app.get("/", async(req, res) =>{
    try{
        const newsArray = await axios.get(API_URL+ "/v2/top-headlines", {
            params: {apiKey : API_key, country : "us"}
        });
        const articles = newsArray.data.articles;
        const topTenArticles = articles.slice(0, 10);
        res.render("index.ejs", {news : topTenArticles});
    }catch{
        console.log("ERROR");
        console.error("Error fetching news: ", error);
        res.sendStatus(404);
    }
});

app.get("/about", (req, res) =>{
    res.render("about.ejs");
});

app.listen(port, () =>{
    console.log(`Server is listening in port ${port}`);
});