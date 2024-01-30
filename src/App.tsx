import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [measure, setMeasure] = useState<any[]>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const getMeasurements = () => {
    axios.get((process.env.REACT_APP_BASE_URL as string)+"/getTests")
    .then(res => {
        setMeasure(res.data);
    })
  }

  const handleUpload = async () => {
    var formData = new FormData();
    formData.append("oru", file as File);
    axios.post((process.env.REACT_APP_BASE_URL as string)+"/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(result => {
      getMeasurements()
    })
  };
  
  return (
    <div className='cont'>
      <div className='left' style={{'width':'80%'}}>
        <div className='upload-section'>
          <h3>Upload ORU Text</h3>
          <input type="file" name="oru" id="oru" onChange={handleFileChange}/>
          <button onClick={handleUpload}>Upload</button>
        </div>
        <h3>Result</h3>
        <div className='results'>
          {
            measure?.map((ms) => (
              <div className='single_res'>
                <p><b>Patient</b>: {ms.person_name}</p>
                <p><b>Test</b>: {ms.test.testDescription}</p>
                <p><b>Ideal Range</b>: {ms.test.low_met+" - "+ms.test.high_met}</p>
                <p><b>Test result</b>: {ms.test.resultValue}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
