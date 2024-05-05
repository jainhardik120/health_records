import React, { useState, useEffect } from 'react';
import { Record } from './RecordList';
import useSigner from '../state/signer';

interface SharedRecord {
  hash: string;
  creationTime: number;
  fileName: string;
  creator: string;
}

interface RecordDetailsProps {
  selectedRecord: Record;
  closePopup: () => void;
}

const RecordDetails: React.FC<RecordDetailsProps> = ({ selectedRecord, closePopup }) => {
  const [records, setRecords] = useState<SharedRecord[]>([]);
  const { address } = useSigner();
  useEffect(() => {
    const fetchRecordsFromIPFS = async () => {
      const metadataResponse = await fetch(`https://ipfs.io/ipfs/${selectedRecord.metahash}`);
      if (metadataResponse.status != 200) return;
      const json = await metadataResponse.json();
      setRecords(json.files)
    };

    fetchRecordsFromIPFS();
  }, [selectedRecord]);

  return (
    <div>
      <div className="popup-container">
        <div className="popup">
          <button onClick={closePopup}>Close</button>
          <h3>Record Details</h3>
          <p>Patient: {selectedRecord.patient}</p>
          <p>Creation Time: {new Date(selectedRecord.creationTime * 1000).toLocaleString()}</p>
          <p>Expiry Time: {new Date((selectedRecord.expiryTime + selectedRecord.creationTime) * 1000).toLocaleString()}</p>
          <p>Metahash: {selectedRecord.metahash}</p>
          <ul>
            {records.map((record, index) => (
              <li key={index}>
                <p>File Name: {record.fileName}</p>
                <p>Creator: {record.creator}</p>
                <p>Creation Time: {new Date(record.creationTime).toLocaleString()}</p>
                <button onClick={async () => {
                  try {
                    const response = await fetch(`/api/decryptFile?ipfsHash=${record.hash}&address=${address}&filename=${record.fileName}`);
                    if (!response.ok) {
                      throw new Error('Failed to download file');
                    }
                    const blob = await response.blob();
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = record.fileName;
                    link.click();
                  } catch (error) {
                  }
                }}>
                  Download
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default RecordDetails;