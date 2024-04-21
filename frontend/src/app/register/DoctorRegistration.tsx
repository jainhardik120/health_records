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

  const handleSubmit = () => {
    const formData = {
      firstName,
      lastName,
      email,
      specialization,
      clinicAddress,
      clinicContact,
      address
    };
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
    <div>
      <TextInput label="First Name" id="firstName" value={firstName} onChange={setFirstName} />
      <TextInput label="Last Name" id="lastName" value={lastName} onChange={setLastName} />
      <TextInput label="Email" id="email" value={email} onChange={setEmail} />
      <TextInput label="Specialization" id="specialization" value={specialization} onChange={setSpecialization} />
      <TextInput label="Clinic Address" id="clinicAddress" value={clinicAddress} onChange={setClinicAddress} />
      <TextInput label="Clinic Contact Number" id="clinicContact" value={clinicContact} onChange={setClinicContact} />
      <Button onClick={handleSubmit}>
        Register
      </Button>
    </div>
  );
};
