"use client"

import React, { useState, useEffect } from 'react';
import { Record } from './RecordList';
import useSigner from '../../state/signer';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import { downloadFile } from '@/downloadFile';

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
  const { address, signer } = useSigner();

  const fetchRecordsFromIPFS = async () => {
    try {
      const response = await fetch(`https://ipfs.io/ipfs/${selectedRecord.metahash}`);
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error || 'Error Fetching Metadata');
      }
      const data = await response.json();
      setRecords(data.files)
    } catch (error: any) {
      toast.error(error.message || "Error Fetching Patient List");
    }
  };

  useEffect(() => {
    fetchRecordsFromIPFS();
  });

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
                      <button onClick={() => { if (address && signer) { downloadFile(record.hash, record.fileName, address, signer) } }} className="text-indigo-600 hover:text-indigo-900">Download</button>
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