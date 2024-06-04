const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/write-word", (req, res) => {
  const word = req.body.word;

  // Check if the file exists, create it if it doesn't
  fs.open("word.txt", "a", (err, fd) => {
    if (err) {
      console.error("Error opening file:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }

    // write to the file
    fs.writeFile(fd, word, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
      res.json({ success: true, message: "Word written to file successfully" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
