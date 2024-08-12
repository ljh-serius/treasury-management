import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { Button } from '@mui/material';

const exportToExcel = async (detailedMontants) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Transaction Data');

  // Add headers for Product Units
  worksheet.addRow([
    'Month',
    'Product ID',
    'Description',
    'Unit Price (€)',
    'Quantity',
    'Discount (%)',
    'Total Before Discount (€)',
    'Final Amount (€)',
    'Purchase Date',
    'Notes'
  ]);

  detailedMontants.forEach((monthDetail, monthIndex) => {
    monthDetail.productUnits.forEach((unit) => {
      worksheet.addRow([
        `Month ${monthIndex + 1}`,
        unit.id,
        unit.description,
        unit.unitPrice,
        unit.quantity,
        unit.discount,
        unit.totalBeforeDiscount,
        unit.finalAmount,
        new Date(unit.purchaseDate).toLocaleDateString(),
        unit.notes
      ]);
    });

    // Add some space before next month's data
    worksheet.addRow([]);
    worksheet.addRow(['Work Earnings']);

    // Add headers for Work Units
    worksheet.addRow([
      'Type',
      'Rate (€)',
      'Hours Worked',
      'Total Earnings (€)',
      'Notes'
    ]);

    monthDetail.workUnits.forEach((unit) => {
      worksheet.addRow([
        unit.type,
        unit.rate,
        unit.hoursWorked,
        unit.totalEarnings,
        unit.notes
      ]);
    });

    worksheet.addRow([]); // Empty row between months
  });

  // Capture charts and add them to the Excel file as images
  const chartContainers = document.querySelectorAll('.chart-container'); // Ensure your chart containers have this class

  for (let i = 0; i < chartContainers.length; i++) {
    const canvas = await html2canvas(chartContainers[i]);
    const imgData = canvas.toDataURL('image/png');

    const imageId = workbook.addImage({
      base64: imgData,
      extension: 'png',
    });

    // Define where you want to place the image in the worksheet
    const rowStart = worksheet.lastRow.number + 2 + (i * 30);  // Adjust row start position based on the current last row
    const rowEnd = rowStart + 70;  // Increase row end position to make the chart larger
    const colEnd = 15;  // Increase column end position to make the chart larger
    worksheet.addImage(imageId, {
      tl: { col: 0, row: rowStart },  // Top-left corner (column, row)
      br: { col: colEnd, row: rowEnd }  // Bottom-right corner (column, row)
    });
  }

  // Save the workbook
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), 'TransactionDataWithCharts.xlsx');
};

const DownloadExcelButton = ({ detailedMontants }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={() => exportToExcel(detailedMontants)}
    style={{ height: 36, float: 'right', marginTop: 15, marginBottom: 20 }}
  >
    Export as Spreadsheet
  </Button>
);

export default DownloadExcelButton;
