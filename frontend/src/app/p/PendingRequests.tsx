import React, { useState, useEffect } from 'react';

import { MedicalRecord } from './page';

interface PendingRequestsProps {
  Records: MedicalRecord[];
  address?: string;
}

const PendingRequests: React.FC<PendingRequestsProps> = ({ address, Records }) => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch(`/api/request/${address}/pending-requests`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPendingRequests(data);
      })
      .catch(error => console.error('Error fetching pending requests:', error));
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
    try {

      const response = await fetch('/api/request/approveRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ipfsHashes: selectedRecords, requestId: selectedRequest.request_id }),
      });

      console.log(await response.json());
    } catch (error) {
      console.log(error);
    }
    // setShowPopup(false);
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
                  {record.hash}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleSendRecords}>Send Records</button>
        </div>
      )}
    </div>
  );
};

export default PendingRequests;
