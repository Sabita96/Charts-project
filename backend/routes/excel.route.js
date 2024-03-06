const router = require("express").Router();
const { readExcel, downloadExcelFile, downloadPDF } = require("../services/excel.service");

router.get("/read", async (req, res) => {
  const chartData = await readExcel();
  res.status(200).send({
    status: true,
    chartData,
  });
});

router.get("/downloadExcel", async (req, res) => {
  const workbook = await downloadExcelFile();

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename= chartData.xlsx");

  await workbook.xlsx.write(res);
  res.end();
});

router.get("/downloadPDF", async (req, res) => {
 const pdfUrl = await downloadPDF(req,res);
 return res.status(200).send({
  pdfUrl,
  status: true
 })
});


module.exports = router;
