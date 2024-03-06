const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8081;
const excelRoute = require("./routes/excel.route");
const errorHandler = require('./middleware/error-handler')
app.use(cors());

app.use("/excel",errorHandler, excelRoute);
app.get("/", (req, res) => {
  res.status(200).send({
    status: true,
  });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
