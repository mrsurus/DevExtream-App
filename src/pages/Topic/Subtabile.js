import React, { useEffect, useState } from 'react';
import DataGrid, {
  Column, Export, GroupPanel, Grouping, SortByGroupSummaryInfo, Editing, SearchPanel,
} from 'devextreme-react/data-grid';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es'; 
import { exportDataGrid as exportDataGridExcel } from 'devextreme/excel_exporter';


const exportFormats = ['pdf', 'xlsx']; 

function Subtabile() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/topic')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCompanies(data);
      });
  }, []);



  const onExporting = (e) => {
    if (e.format === 'pdf') {
      const doc = new jsPDF();

      exportDataGrid({
        jsPDFDocument: doc,
        component: e.component,
        columnWidths: [40, 40, 30, 30, 40],
        customizeCell({ gridCell, pdfCell }) {
          if (gridCell.rowType === 'data' && gridCell.column.dataField === 'Phone') {
            pdfCell.text = pdfCell.text.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
          } else if (gridCell.rowType === 'group') {
            pdfCell.backgroundColor = '#BEDFE6';
          } else if (gridCell.rowType === 'totalFooter') {
            pdfCell.font.style = 'italic';
          }
        },
        customDrawCell(options) {
          const { gridCell, pdfCell } = options;

          if (gridCell.rowType === 'data' && gridCell.column.dataField === 'Website') {
            options.cancel = true;
            doc.setFontSize(11);
            doc.setTextColor('#0000FF');

            const textHeight = doc.getTextDimensions(pdfCell.text).h;
            doc.textWithLink('website',
              options.rect.x + pdfCell.padding.left,
              options.rect.y + options.rect.h / 2 + textHeight / 2, { url: pdfCell.text });
          }
        },
      }).then(() => {
        doc.save('Companies.pdf');
      });
    } else if (e.format === 'xlsx') {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Companies');

      worksheet.columns = [
        { width: 5 }, { width: 30 }, { width: 25 }, { width: 15 }, { width: 25 }, { width: 40 },
      ];

      exportDataGridExcel({
        component: e.component,
        worksheet,
        keepColumnWidths: false,
        topLeftCell: { row: 2, column: 2 },
        customizeCell: ({ gridCell, excelCell }) => {
          if (gridCell.rowType === 'data') {
            if (gridCell.column.dataField === 'Phone') {
              excelCell.value = parseInt(gridCell.value, 10);
              excelCell.numFmt = '[<=9999999]###-####;(###) ###-####';
            }
            if (gridCell.column.dataField === 'Website') {
              excelCell.value = { text: gridCell.value, hyperlink: gridCell.value };
              excelCell.font = { color: { argb: 'FF0000FF' }, underline: true };
              excelCell.alignment = { horizontal: 'left' };
            }
          }
          if (gridCell.rowType === 'group') {
            excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'BEDFE6' } };
          }
          if (gridCell.rowType === 'totalFooter' && excelCell.value) {
            excelCell.font.italic = true;
          }
        },
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Companies.xlsx');
        });
      });
    }
    e.cancel = true;
  };

  return (
    <div>
      <DataGrid
        id="gridContainer"
        dataSource={companies}
        keyExpr="TopicID"
        showBorders={true}
        onExporting={onExporting}>

        <Export enabled={true} formats={exportFormats} />
        <GroupPanel visible={true} />
        <Grouping autoExpandAll={true} />
        <SearchPanel visible={true} />
        <SortByGroupSummaryInfo summaryItem="count" />

        <Editing mode="form" allowUpdating={true} allowAdding={true} allowDeleting={true} />
        <Column dataField="Name" />
        <Column dataField="CreatedOn" dataType="date" />
        <Editing mode="form" allowUpdating={true} allowAdding={true} allowDeleting={true} />
      </DataGrid>
    </div>
  );
}

export default Subtabile;
