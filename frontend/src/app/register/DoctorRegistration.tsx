"use client";
import React, { useState } from 'react';
import Button from '../components/Button';
import useSigner from '../state/signer';
import TextInput from '../components/TextInput';

export const DoctorRegistration = () => {
  const { address } = useSigner();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [clinicAddress, setClinicAddress] = useState('');
  const [clinicContact, setClinicContact] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateContact = (contact: string) => {
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(contact);
  };

  const handleSubmit = () => {
    if (!address) {
      // MetaMask is not connected, prevent form submission
      console.error('MetaMask is not connected. Please connect MetaMask to submit the form.');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (!validateContact(clinicContact)) {
      setError('Clinic contact number must be 10 digits');
      return;
    }

    const formData = {
      firstName,
      lastName,
      email,
      specialization,
      clinicAddress,
      clinicContact,
      address
    };

    // Reset error state
    setError('');

    fetch('api/auth/doctor-registration', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="form-container">
      <div className="form-group">
        <TextInput
          label="First Name"
          className="input-field"
          id="firstName"
          value={firstName}
          onChange={setFirstName}
        />
      </div>
      <div className="form-group">
        <TextInput
          label="Last Name"
          className="input-field"
          id="lastName"
          value={lastName}
          onChange={setLastName}
        />
      </div>
      <div className="form-group">
        <TextInput
          label="Email"
          className="input-field"
          id="email"
          value={email}
          onChange={setEmail}
        />
      </div>
      <div className="form-group">
        <TextInput
          label="Specialization"
          className="input-field"
          id="specialization"
          value={specialization}
          onChange={setSpecialization}
        />
      </div>
      <div className="form-group">
        <TextInput
          label="Clinic Address"
          className="input-field"
          id="clinicAddress"
          value={clinicAddress}
          onChange={setClinicAddress}
        />
      </div>
      <div className="form-group">
        <TextInput
          label="Clinic Contact Number"
          className="input-field"
          id="clinicContact"
          value={clinicContact}
          onChange={setClinicContact}
        />
      </div>
      <Button className="w-full" onClick={handleSubmit}>
        Register
      </Button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};
