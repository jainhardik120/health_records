"use client"

import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

const RegistrationPage = () => {
  const [userType, setUserType] = useState<string>("");
  const handleUserTypeSelect = (type: string) => {
    setUserType(type);
  };

  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactRelationship, setEmergencyContactRelationship] = useState('');
  const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [primaryCarePhysician, setPrimaryCarePhysician] = useState('');
  const [preferredPharmacy, setPreferredPharmacy] = useState('');
  const [medicalLicenseNumber, setMedicalLicenseNumber] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [workHistory, setWorkHistory] = useState('');
  const [educationBackground, setEducationBackground] = useState('');
  const [professionalAffiliations, setProfessionalAffiliations] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      userType,
      fullName,
      dateOfBirth,
      gender,
      contactNumber,
      email,
      address,
      emergencyContactName,
      emergencyContactRelationship,
      emergencyContactNumber,
      insuranceProvider,
      policyNumber,
      medicalHistory,
      primaryCarePhysician,
      preferredPharmacy,
      medicalLicenseNumber,
      specialization,
      workHistory,
      educationBackground,
      professionalAffiliations,
    });
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
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <Input type="text" value={fullName} onChange={(value) => { setFullName(value) }} label='Full Name' />
            <Input type ="date" value={dateOfBirth} onChange={(value)=>{setDateOfBirth(value)}} label='Date of Birth'/>
            <label className="mb-4">
              Gender:
              <select
                className="border rounded px-2 py-1 ml-2"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            <Input type="text" value={contactNumber} onChange={(value) => { setContactNumber(value) }} label='Contact Number' />
            <Input type="email" value={email} onChange={(value) => { setEmail(value) }} label='Email' />
            <Input type="address" value={address} onChange={(value) => { setAddress(value) }} label='Address' />
            
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;
