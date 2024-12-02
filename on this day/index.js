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
        const daySearch = req.body.day;
        const formattedDay = getOrdinalSuffix(parseInt(daySearch));
        const months = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
      ];
      const monthName = months[parseInt(monthSearch, 10) - 1];
        const response = await axios.get(
            `https://byabbe.se/on-this-day/${monthSearch}/${daySearch}/${searchLower}.json`
          );
        const searchResult = response.data[searchLower];
        res.render("results.ejs",  {
            results: searchResult,
            search: searchLower,
            month: monthName,
            day: formattedDay
         });
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.status(500).send("Internal Server Error");
      }
});

function getOrdinalSuffix(day) {
  const j = day % 10, k = day % 100;
  if (j === 1 && k !== 11) return day + "st";
  if (j === 2 && k !== 12) return day + "nd";
  if (j === 3 && k !== 13) return day + "rd";
  return day + "th";
}

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});