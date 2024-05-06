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
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 flex items-center">
        {userType.length === 0 && (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Select Your Role</h1>
            <Button onClick={() => handleUserTypeSelect('patient')} className='block m-4'>
              Continue as Patient
            </Button>
            <Button onClick={() => handleUserTypeSelect('doctor')} className='block m-4'>
              Continue as Doctor
            </Button>
          </div>
        )}
        {userType && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Enter Your Personal Details</h1>
            {userType === 'patient' && <PatientRegistration />}
            {userType === 'doctor' && <DoctorRegistration />}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
