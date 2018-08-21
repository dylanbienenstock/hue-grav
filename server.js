const path = require("path");
const express = require("express");

const app = express();
const port = process.env.port || "8000";

app.use(express.static(path.join(__dirname, "dist/hue-grav")));

app.get("*", (req, res) => {
    console.log("asdasd");
    res.sendFile(path.join(__dirname, "dist/hue-grav/index.html"));
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Listening on port ${port}`);
});
    