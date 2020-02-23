import React, { useState, useEffect } from 'react';
import { CSVLink, CSVDownload } from "react-csv";

export default function PipsFeed(props) {
  const [header, setHeader] = useState(false);
  const [records, setRecords] = useState(false);
  const [footer, setFooter] = useState(false);
  const [csvData, setcsvData] = useState(null);
  const [csvFile, setcsvFile] = useState(null);

  let fileReader;
  const handleFileRead = (e) => {
    const content = fileReader.result;
    var lines = content.split("\n");

    let header = lines.shift();
    let footer = lines.pop();
    let csv = [];
    csv.push([header.substring(1, 15),
    header.substring(15, 25),
    header.substring(25, 55),
    header.substring(55, 57),
    header.substring(57, 65),
    header.substring(65, 73),
    header.substring(73, 77),
    header.substring(77, 78)]);
    lines.forEach(line =>
      csv.push([line.substring(1, 3),
      line.substring(3, 11),
      line.substring(11, 13),
      line.substring(13, 32),
      line.substring(32, 35),
      line.substring(35, 36),
      line.substring(36, 39),
      line.substring(39, 40),
      line.substring(40, 41),
      line.substring(41, 59)])
    );
    csv.push([footer.substring(1, 15),
    footer.substring(15, 34),
    footer.substring(34, 53),
    footer.substring(53, 60)]);
    setcsvData(csv);

    if (footer.length === 0) footer = lines.pop();
    loadHeader(header);
    loadRecords(lines, parseInt(footer.substring(53, 60)), parseFloat(footer.substring(34, 53)));
    loadFooter(footer);
  }
  const loadHeader = (header) => {
    setHeader(<div>
      <h1>Header{header.length === 86 ? '(valid)' : '(invalid)'}</h1>
      <p>Line Length: {header.length}</p>
      <p>Record Number: {header.substring(1, 15)}</p>
      <p>System ID: {header.substring(15, 25)}</p>
      <p>File Description: {header.substring(25, 55)}</p>
      <p>File Number: {header.substring(55, 57)}</p>
      <p>Work as of Date: {header.substring(57, 65)}</p>
      <p>Ceate Date: {header.substring(65, 73)}</p>
      <p>Create Time: {header.substring(73, 77)}</p>
      <p>Stream: {header.substring(77, 78)}</p>
    </div>)
  }
  const loadRecords = (records, count, amount) => {
    let sum = records.reduce(function (a, b) {
      return a + parseFloat(b.substring(40, 59));
    }, 0);

    let recordsValid = '(valid)';
    if ((records.length + 2) !== count) {
      recordsValid = `(invalid, Trailer count: ${count}, Record count: ${records.length + 2})`;
    }
    else if (sum.toFixed(2) !== amount.toFixed(2)) {
      recordsValid = `(invalid, Trailer amount: ${sum.toFixed(2)}, Records amount: ${amount.toFixed(2)})`;
    };
    setRecords(<div>
      <h1>Data{recordsValid}</h1>
      <p>Count: {records.length + 2}</p>
      <p>Amount Sum: {sum.toFixed(2)}</p>
    </div>)
  }
  const loadFooter = (footer) => {
    setFooter(<div>
      <h1>Footer{footer.length === 86 ? '(valid)' : '(invalid)'}</h1>
      <p>Line Length: {footer.length}</p>
      <p>Record Number: {footer.substring(1, 15)}</p>
      <p>Transaction Debit Amount Hash Total: {footer.substring(15, 34)}</p>
      <p>Transaction Credit Amount Hash Total: {footer.substring(34, 53)}</p>
      <p>Record Count: {footer.substring(53, 60)}</p>
    </div>)
  }
  const handleFileChosen = (file) => {
    debugger;
    setcsvFile(file.name + '.csv')
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  }
  return (
    <main className="main">
      <div className='upload-pips'>
        <input type='file'
          id='file'
          className='input-file'
          // accept='.md'
          onChange={e => handleFileChosen(e.target.files[0])}
        />
        {header}
        {records}
        {footer}
        {csvData && <CSVLink data={csvData} filename={csvFile}>Download me</CSVLink>}
      </div>
    </main>
  )
}

