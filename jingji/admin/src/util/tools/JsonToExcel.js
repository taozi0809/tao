const ExportJsonExcel = require("js-export-excel");
export const JsonToExcel = (jsonData,fileName,sheetName,sheetHeader)=>{
    var option = {};
    option.fileName = fileName;
    option.datas = [
        {
            sheetData : jsonData,
            sheetName : sheetName,
            sheetHeader : sheetHeader
        }
    ];
    var toExcel=new ExportJsonExcel(option);
    toExcel.saveExcel();
}



