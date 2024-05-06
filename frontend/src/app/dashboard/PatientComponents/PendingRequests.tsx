"use client"

import React, { useState, useEffect } from 'react';

import { TransactionResponse } from 'ethers';
import useSigner from '../../state/signer';
import Button from '../../components/Button';
import { MedicalRecord } from './PatientHome';


type Request = {
  request_id: number,
  doctor_address: string,
  patient_address: string,
  request_datetime: string,
  message: string
}

const PendingRequests: React.FC = () => {

  const { address, contract } = useSigner();
  const [Records, setRecords] = useState<MedicalRecord[]>([]);
  useEffect(() => {
    const getRecords = async () => {
      const res = await contract.getValidRecords();
      console.log(res);
      setRecords(
        res.map((item: any[], i: any) => {
          return ({
            hash: item[2],
            creationTime: Number(item[1]),
            fileName: item[4],
            creator: item[3]
          })
        })
      )
    }
    if (address) {
      getRecords();
    }
  }, [address, contract])

  const [pendingRequests, setPendingRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [timeInSeconds, setTimeInSeconds] = useState<number>(3600);
  const [showPopup, setShowPopup] = useState(false);

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = parseInt(event.target.value);
    setTimeInSeconds(timeValue);
  };

  const loadPendingRequests = () => {
    fetch(`/api/request/${address}/pending-requests`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPendingRequests(data);
      })
      .catch(error => console.error('Error fetching pending requests:', error));
  }

  const deleteRequest = async (id: number) => {
    try {
      const response = await fetch(`/api/request/deleteRequest/${id.toString()}`, {
        method: 'DELETE'
      });
      loadPendingRequests();
    } catch (error) {
      console.error('Error deleting request:', error)
    }
  }


  useEffect(() => {
    loadPendingRequests();
  }, [address]);

  const handleApproveRequest = (request: any) => {
    setSelectedRequest(request);
    setShowPopup(true);
  };

  const handleRecordCheckboxChange = (recordId: string) => {
    setSelectedRecords(prevSelected => {
      if (prevSelected.includes(recordId)) {
        return prevSelected.filter(id => id !== recordId);
      } else {
        return [...prevSelected, recordId];
      }
    });
  };

  const handleSendRecords = async () => {
    console.log('Selected records:', selectedRecords);
    if (selectedRecords.length == 0) {
      return;
    }
    if (!selectedRequest) {
      return;
    }
    try {
      let convertedRecords: MedicalRecord[] = [];
      for (let i = 0; i < Records.length; i++) {
        if (selectedRecords.includes(Records[i].hash)) {
          convertedRecords = [...convertedRecords, Records[i]];
        }
      }
      const response = await fetch('/api/request/approveRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ipfsHashes: convertedRecords, requestId: selectedRequest.request_id }),
      });
      const body = await response.json();
      console.log(body);
      const transaction: TransactionResponse = await contract.createRecordCopy(selectedRequest.doctor_address, body.hash, timeInSeconds);
      await transaction.wait();
      alert("Created Document Successfully");
      await deleteRequest(selectedRequest.request_id);
    } catch (error) {
      console.log(error);
    }
    setShowPopup(false);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Time</th>
              <th className="px-6 py-3 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pendingRequests && pendingRequests.length > 0 && pendingRequests.map((request: any) => (
              <tr key={request.request_id}>
                <td className="px-6 py-4 whitespace-nowrap">{request.doctor_address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.message}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(request.request_datetime).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleApproveRequest(request)} className="text-indigo-600 hover:text-indigo-900">Approve Request</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && selectedRequest && (
        <div className="popup-container">
          <div className="popup">
            <div className="mb-4">
              <p className="text-gray-800 font-semibold">Doctor: {selectedRequest.doctor_address}</p>
              <p className="text-gray-600">Message: {selectedRequest.message}</p>
              <p className="text-gray-600">Date Time: {new Date(selectedRequest.request_datetime).toLocaleString()}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="timeinseconds">
                Select Records to Send
              </label>
              <ul className="divide-y divide-gray-200">
                {Records.map(record => (
                  <li key={record.hash} className="flex items-center py-2">
                    <input
                      type="checkbox"
                      checked={selectedRecords.includes(record.hash)}
                      onChange={() => handleRecordCheckboxChange(record.hash)}
                      className="form-checkbox h-5 w-5 text-gray-800 border-gray-300 rounded"
                    />
                    <label htmlFor={record.hash} className="ml-3 text-sm font-medium text-gray-700">{record.fileName}</label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="timeinseconds">
                Time in Seconds
              </label>
              <input
                id="timeinseconds"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                value={timeInSeconds}
                onChange={handleTimeChange}
              />
            </div>
            <div className="flex justify-between">
              <Button onClick={handleSendRecords}>Send Records</Button>
              <Button onClick={() => setShowPopup(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRequests;
