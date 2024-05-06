"use client"

import React, { useState, useEffect } from 'react';
import useSigner from '../../state/signer';
import TextInput from '../../components/TextInput';
import TextArea from '../../components/TextArea';

interface PatientRequestProps {
  closePopup: () => void
}

const PatientRequestForm: React.FC<PatientRequestProps> = ({ closePopup }) => {
  const { address } = useSigner();
  const [patientAddress, setPatientAddress] = useState('');
  const [message, setMessage] = useState('');
  const [patientAddresses, setPatientAddresses] = useState<string[]>([]);

  useEffect(() => {
    // Fetch list of patient addresses
    fetch('/api/request/patientList')
      .then(response => response.json())
      .then(data => setPatientAddresses(data))
      .catch(error => console.error('Error fetching patient addresses:', error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Add patient request to the database
      const response = await fetch('/api/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorAddress: address, patientAddress, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to add request');
      }

      setPatientAddress('');
      setMessage('');

      // Optionally, you can show a success message or perform other actions
      console.log('Request added successfully');
    } catch (error) {
      console.error('Error adding request:', error);
    }
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
