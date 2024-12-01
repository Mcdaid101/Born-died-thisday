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
        const formSearch = req.body.search;
        const searchLower = formSearch.toLowerCase();
        const monthSearch = req.body.month;
        const yearSearch = req.body.year;
        const response = await axios.get(
            `https://byabbe.se/on-this-day/${monthSearch}/${yearSearch}/${searchLower}.json`
          );
        const searchResult = response.data;
        console.log(info);
        res.render("result.ejs", 
        {searchResult: result,
                 month: month,
                    year: year
         });
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.status(500).send("Internal Server Error");
      }
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});