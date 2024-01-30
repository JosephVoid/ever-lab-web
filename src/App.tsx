import React, { useState } from 'react';
import './App.css';
import { getTests, uploadORU } from './api';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [measure, setMeasure] = useState<any[]>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file && file.type === "text/plain"){
      const res = await uploadORU(file as File)
      if (res) {
        let tests = await getTests();
        if (tests)
          setMeasure(tests);
      }
    }
    else alert("No file seleted or wrong type")
  };
  
  return (
    <div className='cont'>
      <div className='left'>
        <div className='upload-section'>
          <h3>Upload ORU Text</h3>
          <input className='input-field' type="file" name="oru" id="oru" onChange={handleFileChange}/>
          <button onClick={handleUpload}>Upload</button>
        </div>
        <h3>Result</h3>
        <div className='results'>
          {
            measure?.map((ms) => (
              <div className={`single_res ${ms.test.risky ? 'risk': ''}`}>
                <p><b>Patient</b>: {ms.person_name}</p>
                <p><b>Test Code</b>: {ms.test.testCode}</p>
                <p><b>Test</b>: {ms.test.testDescription}</p>
                <p><b>Ideal Range</b>: {ms.test.low_met+" - "+ms.test.high_met}</p>
                <p><b>Test result</b>: {ms.test.resultValue}</p>
                <p><b>Risk Status</b>: {ms.test.risky ? 'Risky' : 'No Risk'}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
