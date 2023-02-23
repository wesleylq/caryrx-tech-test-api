
var fs = require('fs');
const crypto = require('crypto');
const { parse } = require("csv-parse");
const { stringify } = require("csv-stringify");
const columns = [
  "company_id",
  "company_name",
  "medicine_id",
  "product_name",
  "presentation_description",
  "cas_number",
  "substance_name",
  "product_type",
  "tax_criteria",
  "hospital_exclusive",
  "government_discount",
  "tax_imunity",
  "max_price"
];

const writableStream = fs.createWriteStream("./data_out.csv");

const stringifier = stringify({ header: true, columns: columns, delimiter: ';' });


fs.createReadStream("data.csv")
  .pipe(parse({ delimiter: ";", from_line: 2 }))
  .on("data", function (row) {

    row[0] = crypto.createHash('sha256').update(row[1]).digest('hex')
    row[2] = crypto.createHash('sha256').update(row[1]+row[3]).digest('hex');

    stringifier.write(row);

  })
  .on("end", function () {
    console.log("finished");
    stringifier.pipe(writableStream);
  })
  .on("error", function (error) {
    console.log(error.message);
  });

