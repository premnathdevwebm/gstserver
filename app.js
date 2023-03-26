const express = require("express");
const app = express();

const healthRotes = require("./routes/health")

const port = process.env.PORT || 3001;

app.use("/", healthRotes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    err.status(401);
    res.json({ message: `${err.name} : ${err.message}` });
  }
});
app.use((err, req, res, next) => {
    err.status(err.status || 500);
    res.json({ message: `${err.name} : ${err.message}` });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
