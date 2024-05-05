import React, { useEffect, useState } from 'react';
import RecordDetails from './RecordDetails';

export interface Record {
  patient: string;
  creationTime: number;
  expiryTime: number;
  metahash: string;
}

interface RecordListProps {
  records: Record[];
}

const RecordList: React.FC<RecordListProps> = ({ records }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  const handleOpenPopup = (record: Record) => {
    setSelectedRecord(record);
    setShowPopup(true);
  };

  return (
    <div>
      <h2>Record List</h2>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            <p>Patient: {record.patient}</p>
            <p>Creation Time: {new Date(record.creationTime).toLocaleString()}</p>
            <p>Expiry Time: {new Date(record.expiryTime).toLocaleString()}</p>
            <p>Metahash: {record.metahash}</p>
            <button onClick={() => handleOpenPopup(record)}>View Details</button>
          </li>
        ))}
      </ul>
      {showPopup && selectedRecord && (
        <RecordDetails selectedRecord={selectedRecord} closePopup={()=>setShowPopup(false)}/>
      )}
    </div>
  );
};

export default RecordList;
