import React, { useEffect, useState } from "react";
import DataGrid, {
  Column,
  Export,
  GroupPanel,
  Grouping,
  SortByGroupSummaryInfo,
  Editing,
  SearchPanel,
  Paging,
  Pager,
} from "devextreme-react/data-grid";
import { jsPDF } from "jspdf";
import { exportDataGrid } from "devextreme/pdf_exporter";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es"; // Use 'file-saver-es' as you mentioned
import { exportDataGrid as exportDataGridExcel } from "devextreme/excel_exporter";

const exportFormats = ["pdf", "xlsx"]; // Add both export formats

function SubTopicTable() {
  const [topic, setTopic] = useState([]);

  let date = new Date();
  let c = date.getHours();
  let d = date.getMinutes();
  let date1 = date.toString();
  let date2 = date1.split(" ");
  const finaldate = date2.slice(1, 4);
  const fullFinalData = finaldate.join("-");

  const YYYY_MM_DD_Formatter = (date, format = "YYYY-MM-DD") => {
    const t = new Date(date);
    const y = t.getFullYear();
    const m = ("0" + (t.getMonth() + 1)).slice(-2);
    const d = ("0" + t.getDate()).slice(-2);
    return format.replace("YYYY", y).replace("MM", m).replace("DD", d);
  };
  const formatDate = YYYY_MM_DD_Formatter(fullFinalData);

  useEffect(() => {
    fetch("http://localhost:3000/subtopic")
      .then((res) => res.json())
      .then((data) => {
        setTopic(data);
      });
  }, []);

  const onExporting = (e) => {
    if (e.format === "pdf") {
      const doc = new jsPDF();

      exportDataGrid({
        jsPDFDocument: doc,
        component: e.component,
        columnWidths: [40, 40, 30, 30, 40],
        customizeCell({ gridCell, pdfCell }) {
          if (
            gridCell.rowType === "data" &&
            gridCell.column.dataField === "Phone"
          ) {
            pdfCell.text = pdfCell.text.replace(
              /(\d{3})(\d{3})(\d{4})/,
              "($1) $2-$3"
            );
          } else if (gridCell.rowType === "group") {
            pdfCell.backgroundColor = "#BEDFE6";
          } else if (gridCell.rowType === "totalFooter") {
            pdfCell.font.style = "italic";
          }
        },
        customDrawCell(options) {
          const { gridCell, pdfCell } = options;

          if (
            gridCell.rowType === "data" &&
            gridCell.column.dataField === "Website"
          ) {
            options.cancel = true;
            doc.setFontSize(11);
            doc.setTextColor("#0000FF");

            const textHeight = doc.getTextDimensions(pdfCell.text).h;
            doc.textWithLink(
              "website",
              options.rect.x + pdfCell.padding.left,
              options.rect.y + options.rect.h / 2 + textHeight / 2,
              { url: pdfCell.text }
            );
          }
        },
      }).then(() => {
        doc.save(`subtopic-${formatDate}-${c}.${d}.pdf`);
      });
    } else if (e.format === "xlsx") {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("topic");

      worksheet.columns = [
        { width: 5 },
        { width: 30 },
        { width: 25 },
        { width: 15 },
        { width: 25 },
        { width: 40 },
      ];

      exportDataGridExcel({
        component: e.component,
        worksheet,
        keepColumnWidths: false,
        topLeftCell: { row: 2, column: 2 },
        customizeCell: ({ gridCell, excelCell }) => {
          if (gridCell.rowType === "data") {
            if (gridCell.column.dataField === "Phone") {
              excelCell.value = parseInt(gridCell.value, 10);
              excelCell.numFmt = "[<=9999999]###-####;(###) ###-####";
            }
            if (gridCell.column.dataField === "Website") {
              excelCell.value = {
                text: gridCell.value,
                hyperlink: gridCell.value,
              };
              excelCell.font = { color: { argb: "FF0000FF" }, underline: true };
              excelCell.alignment = { horizontal: "left" };
            }
          }
          if (gridCell.rowType === "group") {
            excelCell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "BEDFE6" },
            };
          }
          if (gridCell.rowType === "totalFooter" && excelCell.value) {
            excelCell.font.italic = true;
          }
        },
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            `subtopic-${formatDate}-${c}.${d}.xlsx`
          );
        });
      });
    }
    e.cancel = true;
  };

  return (
    <div>
      <DataGrid
        id="gridContainer"
        dataSource={topic}
        keyExpr="TopicID"
        showBorders={true}
        onExporting={onExporting}
      >
        <Export enabled={true} formats={exportFormats} />
        <GroupPanel visible={true} />
        <Grouping autoExpandAll={true} />
        <SearchPanel visible={true} />
        <SortByGroupSummaryInfo summaryItem="count" />
        <Paging defaultPageSize={10} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={[5, 10, 20]}
          showInfo={true}
        />

        <Editing
          mode="form"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        />
        <Column dataField="Name" />
        <Column dataField="CreatedOn" dataType="date" />
        <Editing
          mode="form"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        />
      </DataGrid>
    </div>
  );
}

export default SubTopicTable;
