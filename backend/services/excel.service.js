const ExcelJs = require("exceljs");
const QuickChart = require("quickchart-js");
const filePath = "./excelFile.xlsx";

const readExcel = async () => {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
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
  await workbook.xlsx.readFile(filePath);
  const worksheet1 = workbook.getWorksheet(1);
  const excelData = [];
  worksheet1.eachRow((row, rowNumber) => {
    worksheet.addRow(row.values);

    excelData.push(row.values.filter((ele) => ele));
  });
  return workbook;
};

const generateQuickChartConfig = (chartData) => {
  return {
    type: "bar",
    data: {
      labels: chartData.categories,
      datasets: chartData.series.map((ele, i) => ({
        label: ele.name,
        data: ele.data,
        backgroundColor: i === 0 ? "rgb(54, 162, 235)" : "rgb(0, 227, 150, 0.85)",
      })),
    },
  };
};

const downloadPDF = async () => {
  const filePath = "./excelFile.xlsx";
  const chartData = await readExcel(filePath);
  const quickChartConfig = generateQuickChartConfig(chartData);

  const myChart = new QuickChart();
  myChart
    .setConfig(quickChartConfig)
    .setBackgroundColor("azure")
    .setWidth(800)
    .setHeight(400);

  return myChart.getUrl();
};

module.exports = { readExcel, downloadExcelFile, downloadPDF };
