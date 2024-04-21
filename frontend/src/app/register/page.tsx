"use client"

import React, { useState } from 'react';
import Button from '../components/Button';
import PatientRegistration from './PatientRegistration';
import { DoctorRegistration } from './DoctorRegistration';

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
