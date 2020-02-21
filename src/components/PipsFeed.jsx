import React, { useState, useEffect } from 'react';

export default function PipsFeed(props) {
  const [header, setHeader] = useState(false);
  const [records, setRecords] = useState(false);
  const [footer, setFooter] = useState(false);
  // const [recordsValid, setRecordsValid] = useState(false);

  let fileReader;
  const handleFileRead = (e) => {
    const content = fileReader.result;
    var lines = content.split("\n");
    let header = lines.shift();
    let footer = lines.pop();
    // console.log('header');
    // console.log(header);
    // console.log('body');
    // for (var i = 0; i < lines.length; ++i) {
    //   console.log(lines[i]);
    // }
    // console.log('footer');
    // console.log(footer);
    loadHeader(header);
    loadRecords(lines, parseInt(footer.substring(53, 60)), parseFloat(footer.substring(34, 53)));
    loadFooter(footer);
  }
  const loadHeader = (header) => {
    setHeader(<div>
      <h1>Header{header.length == 86 ? '(valid)' : '(invalid)'}</h1>
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
    debugger;
    let recordsValid = false;
    if (records.length == count && sum == amount) {
      recordsValid = true;
    };
    setRecords(<div>
      {/* <h1>Data{records.length == count ? '(valid)' : '(invalid)'}</h1> */}
      <h1>Data{recordsValid ? '(valid)' : '(invalid)'}</h1>
      <p>Count: {records.length}</p>
      <p>Amount Sum: {sum}</p>
    </div>)
  }
  const loadFooter = (footer) => {
    setFooter(<div>
      <h1>Footer{footer.length == 86 ? '(valid)' : '(invalid)'}</h1>
      <p>Line Length: {footer.length}</p>
      <p>Record Number: {footer.substring(1, 15)}</p>
      <p>Transaction Debit Amount Hash Total: {footer.substring(15, 34)}</p>
      <p>Transaction Credit Amount Hash Total: {footer.substring(34, 53)}</p>
      <p>Record Count: {footer.substring(53, 60)}</p>
    </div>)
  }
  const handleFileChosen = (file) => {
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

      </div>
    </main>
  )
}

