"use client"

import React, { useState, useEffect } from 'react';
import useSigner from '../../state/signer';
import TextInput from '../../components/TextInput';
import TextArea from '../../components/TextArea';
import { toast } from 'react-toastify';

interface PatientRequestProps {
  closePopup: () => void
}

const PatientRequestForm: React.FC<PatientRequestProps> = ({ closePopup }) => {
  const { address } = useSigner();
  const [patientAddress, setPatientAddress] = useState('');
  const [message, setMessage] = useState('');
  const [patientAddresses, setPatientAddresses] = useState<string[]>([]);

  const fetchPatientList = async () => {
    try {
      const response = await fetch('/api/request/patientList');
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error || 'Error Fetching Patient List');
      }
      const data = await response.json();
      setPatientAddresses(data)
    } catch (error: any) {
      toast.error(error.message || "Error Fetching Patient List");
    }
  }

  useEffect(() => {
    fetchPatientList()
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = toast.loading("Creating Request");
    try {
      const response = await fetch('/api/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorAddress: address, patientAddress, message }),
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error || 'Error Creating Request');
      }
      setPatientAddress('');
      setMessage('');
      toast.update(id, { render: 'Request added successfully', type: "success", isLoading: false });
    } catch (error: any) {
      toast.update(id, { render: error.message, type: "error", isLoading: false })
    }
    toast.dismiss(id);
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <form onSubmit={handleSubmit}>
          <TextInput label="Patient Address" id="patientaddress" value={patientAddress} onChange={setPatientAddress}
            list="patientAddresses"
          />
          <datalist id="patientAddresses">
            {patientAddresses.map(address => (
              <option key={address} value={address} />
            ))}
          </datalist>
          <TextArea
            label='Message'
            id="message"
            value={message} onChange={setMessage}
          />
          <div className="flex justify-between">
            <button className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded" type="submit">
              Submit
            </button>
            <button onClick={closePopup} className="hover:bg-gray-800 text-white py-2 px-4 rounded bg-gray-900">Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRequestForm;
