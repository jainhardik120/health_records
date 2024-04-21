import React, { useState } from 'react';
import Button from '../components/Button';
import useSigner from '../state/signer';
import TextInput from '../components/TextInput';


const PatientRegistration = () => {
  const { address } = useSigner();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDOB] = useState('');
  const [gender, setGender] = useState('');
  const [paddress, setAddress] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = () => {
    const formData = {
      firstName,
      lastName,
      email,
      dob,
      gender,
      paddress,
      contact,
      address
    };
    fetch('api/auth/patient-registration', {
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
      <TextInput label="Date of Birth" id="dob" value={dob} onChange={setDOB} />
      <TextInput label="Gender" id="gender" value={gender} onChange={setGender} />
      <TextInput label="Address" id="address" value={paddress} onChange={setAddress} />
      <TextInput label="Contact Number" id="contact" value={contact} onChange={setContact} />
      <Button onClick={handleSubmit} >
        Register
      </Button>
    </div>
  );
};

export default PatientRegistration;