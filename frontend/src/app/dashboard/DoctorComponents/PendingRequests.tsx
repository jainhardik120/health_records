"use client"

import React, { useState, useEffect } from 'react';
import useSigner from '../../state/signer';
import Button from '@/app/components/Button';
import PatientRequestForm from './PatientRequestForm';
import { toast } from 'react-toastify';
import { AddressLink } from '@/app/components/AddressLink';

const PendingRequests: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const { address } = useSigner();
  const [patientRequestOpened, setPatientRequestOpened] = useState(false);

  const fetchPendingList = async (taddress: string) => {
    try {
      const response = await fetch(`/api/request/${taddress}/pending-requests`);
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error || 'Error Fetching Requests');
      }
      const data = await response.json();
      setPendingRequests(data);
    } catch (error: any) {
      toast.error(error.message || "Error Fetching Patient List");
    }
  }

  useEffect(() => {
    if (address) {
      fetchPendingList(address);
    }
  }, [address]);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pendingRequests && pendingRequests.length > 0 && pendingRequests.map((request: any) => (
              <tr key={request.request_id}>
                <td className="px-6 py-4 whitespace-nowrap"><AddressLink hash={request.patient_address} /></td>
                <td className="px-6 py-4 whitespace-nowrap">{request.message}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(request.request_datetime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center p-4">
        <Button onClick={() => setPatientRequestOpened(true)}>Create New Request</Button>
      </div>
      {patientRequestOpened && (
        <PatientRequestForm closePopup={() => setPatientRequestOpened(false)} />
      )}
    </div>
  );
};

export default PendingRequests;
