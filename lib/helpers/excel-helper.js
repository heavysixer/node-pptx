const excelBuilder = require('./msexcel-builder');

class ExcelHelper {
    static createWorkbook(data) {
        return new Promise(function(resolve, reject) {
            let workbook = excelBuilder.createWorkbook();

            // # columns: data.length+1
            // # rows: data[0].values.length+1
            let sheet1 = workbook.createSheet('Sheet1', data.length + 1, data[0].values.length + 1);

            // header
            for (let i = 0; i < data.length; i++) {
                sheet1.set(i + 2, 1, data[i].name);
            }

            // categories
            for (let i = 0; i < data[0].labels.length; i++) {
                sheet1.set(1, i + 2, data[0].labels[i]);
            }

            // values
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].values.length; j++) {
                    sheet1.set(i + 2, j + 2, data[i].values[j]);
                }
            }

            workbook.generate(function(err, zip) {
                if (err) reject(err);

                resolve(zip);
            });
        });
    }

    static rowColToSheetAddress(row, col, isRowAbsolute, isColAbsolute) {
        let address = '';

        if (isColAbsolute) address += '$';

        // these lines of code will transform the number 1-26 into A->Z
        // used in excel's cell's coordination
        while (col > 0) {
            let num = col % 26;

            col = (col - num) / 26;
            address += String.fromCharCode(65 + num - 1);
        }

        if (isRowAbsolute) address += '$';

        address += row;

        return address;
    }
}

module.exports.ExcelHelper = ExcelHelper;
