"use client"

import React, { useState, useEffect } from 'react';
import { Record } from './RecordList';
import useSigner from '../../state/signer';
import Button from '../../components/Button';

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
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Record Details</h3>
            <p className="text-gray-700">Patient: {selectedRecord.patient}</p>
            <p className="text-gray-700">Creation Time: {new Date(selectedRecord.creationTime * 1000).toLocaleString()}</p>
            <p className="text-gray-700">Expiry Time: {new Date((selectedRecord.expiryTime + selectedRecord.creationTime) * 1000).toLocaleString()}</p>
            <p className="text-gray-700">Metahash: {selectedRecord.metahash}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                {records.map((record, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-gray-800 font-semibold">File Name: {record.fileName}</p>
                      <p className="text-gray-600">Creator: {record.creator}</p>
                      <p className="text-gray-600">Creation Time: {new Date(record.creationTime).toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
                          console.error(error);
                        }
                      }} className="text-indigo-600 hover:text-indigo-900">Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 flex justify-end">
            <Button onClick={closePopup}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordDetails;