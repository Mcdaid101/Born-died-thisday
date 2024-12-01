import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// renders home page
app.get("/", (req, res) => {
    res.render("index.ejs");
});

// search
app.post("/search", async (req, res) => {
    try {
        console.log(req.body)
      } catch (error) {
        console.error(error);
      }
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});