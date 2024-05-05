import React, { useState, useEffect } from 'react';
import useSigner from '../state/signer';

const PatientRequestForm: React.FC = () => {
  const {address} = useSigner();
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
        body: JSON.stringify({ doctorAddress : address, patientAddress, message }),
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="patientAddress">Patient Address:</label>
        <input
          type="text"
          id="patientAddress"
          value={patientAddress}
          onChange={e => setPatientAddress(e.target.value)}
          list="patientAddresses"
        />
        <datalist id="patientAddresses">
          {patientAddresses.map(address => (
            <option key={address} value={address} />
          ))}
        </datalist>
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PatientRequestForm;
