const ExcelJs = require("exceljs");
const QuickChart = require("quickchart-js");

const readExcel = async () => {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile("./excelFile.xlsx");
  const worksheet = workbook.getWorksheet(1);
  const excelData = [];
  const chartData = {
    series: [],
    categories: [],
  };

  worksheet.eachRow((row, rowNumber) => {
    let filteredData = row.values.filter((ele) => ele);
    excelData.push(row.values.filter((ele) => ele));
    if (rowNumber === 2) {
      chartData.series.push({ name: excelData[0][1], data: [] });
      chartData.series.push({ name: excelData[0][2], data: [] });
    } else {
      chartData.series[0].data.push(filteredData[1]);
      chartData.series[1].data.push(filteredData[2]);

      chartData.categories.push(filteredData[0]);
    }
  });
  return chartData;
};

const downloadExcelFile = async (req, res) => {
  const workbook = new ExcelJs.Workbook();
  const worksheet = workbook.addWorksheet("Excel Data");
  await workbook.xlsx.readFile("./excelFile.xlsx");
  const worksheet1 = workbook.getWorksheet(1);
  const excelData = [];
  worksheet1.eachRow((row, rowNumber) => {
    worksheet.addRow(row.values);

    excelData.push(row.values.filter((ele) => ele));
  });
  return workbook;
};

const downloadPDF = async () => {
  const chartData = await readExcel();
  const myChart = new QuickChart();
  myChart
    .setConfig({
      type: "bar",
      data: {
        labels: chartData.categories,
        datasets: chartData.series.map((ele) => {
          return {
            label: ele.name,
            data: ele.data,
          };
        }),
      },
    })
    .setWidth(800)
    .setHeight(400);
  const chartImageUrl = myChart.getUrl();
  return chartImageUrl;
};

module.exports = { readExcel, downloadExcelFile, downloadPDF };
