import React, { useState, useEffect } from 'react';

import { MedicalRecord } from './page';
import { TransactionResponse } from 'ethers';
import useSigner from '../state/signer';

interface PendingRequestsProps {
  Records: MedicalRecord[];
  address?: string;
}

type Request = {
  request_id : number,
  doctor_address : string,
  patient_address : string,
  request_datetime : string,
  message : string
}

const PendingRequests: React.FC<PendingRequestsProps> = ({ address, Records }) => {
  const [pendingRequests, setPendingRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request|null>(null);
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [timeInSeconds, setTimeInSeconds] = useState<number>(3600);
  const [showPopup, setShowPopup] = useState(false);

  const { contract } = useSigner();

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
    if(selectedRecords.length==0){
      return;
    }
    if(!selectedRequest){
      return;
    }
    try {
      let convertedRecords : MedicalRecord[] = [];
      for(let i = 0; i < Records.length; i++){
        if(selectedRecords.includes(Records[i].hash)){
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
      <h2>Pending Requests</h2>
      <ul>
        {pendingRequests && pendingRequests.length > 0 && pendingRequests.map((request: any) => (
          <li key={request.request_id}>
            <p>Doctor: {request.doctor_address}</p>
            <p>Message: {request.message}</p>
            <p>Date Time: {new Date(request.request_datetime).toLocaleString()}</p>
            <button onClick={() => handleApproveRequest(request)}>Approve Request</button>
          </li>
        ))}
      </ul>
      {showPopup && (
        <div className="popup">
          <h3>Select Records to Send</h3>
          <ul>
            {Records.map(record => (
              <li key={record.hash}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedRecords.includes(record.hash)}
                    onChange={() => handleRecordCheckboxChange(record.hash)}
                  />
                  {record.fileName}
                </label>
              </li>
            ))}
          </ul>
          <label>
            Time in Seconds:
            <input
              type="number"
              value={timeInSeconds}
              onChange={handleTimeChange}
            />
          </label>
          <button onClick={handleSendRecords}>Send Records</button>
        </div>
      )}
    </div>
  );
};

export default PendingRequests;
