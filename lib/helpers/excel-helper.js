const excelBuilder = require('./msexcel-builder');

class ExcelHelper {
    static createWorkbook(data, callback) {
        let workbook = excelBuilder.createWorkbook();

        // # columns: data['data'].length+1
        // # rows: data['data'][0].values.length+1
        let sheet1 = workbook.createSheet('Sheet1', data['data'].length + 1, data['data'][0].values.length + 1);

        // header
        for (let i = 0; i < data['data'].length; i++) {
            sheet1.set(i + 2, 1, data['data'][i].name);
        }

        // categories
        for (let i = 0; i < data['data'][0].labels.length; i++) {
            sheet1.set(1, i + 2, data['data'][0].labels[i]);
        }

        // values
        for (let i = 0; i < data['data'].length; i++) {
            for (let j = 0; j < data['data'][i].values.length; j++) {
                sheet1.set(i + 2, j + 2, data['data'][i].values[j]);
            }
        }

        workbook.generate(callback); // returns (err, zip)
    }
}

module.exports.ExcelHelper = ExcelHelper;
