"use client"

import React, { useState } from 'react';
import Button from '../components/Button';
import useSigner from '../state/signer';
import TextInput from '../components/TextInput';

const DoctorRegistration = () => {
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
      <Button onClick={handleSubmit} >
        Register
      </Button>
    </div>
  );
};

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


const RegistrationPage = () => {
  const [userType, setUserType] = useState<string>("");
  const handleUserTypeSelect = (type: string) => {
    setUserType(type);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {userType.length == 0 && (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6">Select Your Role</h1>
          <Button onClick={() => handleUserTypeSelect('patient')} className='my-4'>
            Continue as Patient
          </Button>
          <Button onClick={() => handleUserTypeSelect('doctor')} className='my-4'>
            Continue as Doctor
          </Button>
        </div>
      )}
      {userType && (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6">Enter Your Personal Details</h1>
          {
            userType == "patient" && (
              <PatientRegistration />
            )
          }
          {
            userType == "doctor" && (
              <DoctorRegistration />
            )
          }
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;
