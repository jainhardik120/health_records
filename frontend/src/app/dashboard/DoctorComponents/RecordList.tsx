"use client"

import React, { useState } from 'react';
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
    <>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creation Time</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Time</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metahash</th>
              <th className="px-6 py-3 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{record.patient}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(record.creationTime * 1000).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date((record.expiryTime + record.creationTime) * 1000).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.metahash}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleOpenPopup(record)} className="text-indigo-600 hover:text-indigo-900">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPopup && selectedRecord && (
        <RecordDetails selectedRecord={selectedRecord} closePopup={() => setShowPopup(false)} />
      )}

    </>
  );
};

export default RecordList;
