"use client"

import React, { useState } from 'react';
import Button from '../components/Button';
import useSigner from '../state/signer';

interface TextInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
}

interface SubmitButtonProps {
  label: string;
  onClick: () => void;
}


const TextInput: React.FC<TextInputProps> = ({ label, id, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="button"
    >
      {label}
    </button>
  );
};

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
      <SubmitButton label="Register" onClick={handleSubmit} />
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
    fetch('api/patient-registration', {
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
      <SubmitButton label="Register" onClick={handleSubmit} />
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
