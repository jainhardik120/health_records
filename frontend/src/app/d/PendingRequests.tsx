import React, { useState, useEffect } from 'react';
import useSigner from '../state/signer';

const PendingRequests: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const { address } = useSigner();

  useEffect(() => {
    fetch(`/api/request/${address}/pending-requests`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPendingRequests(data);
      })
      .catch(error => console.error('Error fetching pending requests:', error));
  }, [address]);

  return (
    <div>
      <h2>Pending Requests</h2>
      <ul>
        {pendingRequests && pendingRequests.length > 0 && pendingRequests.map((request: any) => (
          <li key={request.request_id}>
            <p>Patient: {request.patient_address}</p>
            <p>Message: {request.message}</p>
            <p>Date Time: {new Date(request.request_datetime).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingRequests;
