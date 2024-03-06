const router = require("express").Router();
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    status: false,
    error: "Internal Server Error",
  });
});

module.exports = router;
