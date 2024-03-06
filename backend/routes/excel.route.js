const router = require("express").Router();
const {
  readExcel,
  downloadExcelFile,
  downloadPDF,
} = require("../services/excel.service");

router.get("/read", async (req, res, next) => {
  try {
    const chartData = await readExcel();
    res.status(200).send({
      status: true,
      chartData,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/downloadExcel", async (req, res, next) => {
  try {
    const workbook = await downloadExcelFile();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename= chartData.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    next(error);
  }
});

router.get("/downloadPDF", async (req, res, next) => {
  try {
    const pdfUrl = await downloadPDF(req, res);
    return res.status(200).send({
      pdfUrl,
      status: true,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
