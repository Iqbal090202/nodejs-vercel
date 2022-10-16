const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.json({ message: "API NODE JS" });
});

module.exports = app;