"use client"

import React, { useState } from 'react';
import Button from '../components/Button';
import PatientRegistration from './PatientRegistration';
import { DoctorRegistration } from './DoctorRegistration';
import "../styles/registrationpage.css";

const RegistrationPage = () => {
  const [userType, setUserType] = useState<string>("");
  const handleUserTypeSelect = (type: string) => {
    setUserType(type);
  };

  return (
    <div className="container">
      {userType.length === 0 && (
        <div className="role-selection">
          <h1 className="title">Select Your Role</h1>
          <Button onClick={() => handleUserTypeSelect('patient')}>
            Continue as Patient
          </Button>
          <Button onClick={() => handleUserTypeSelect('doctor')}>
            Continue as Doctor
          </Button>
        </div>
      )}
      {userType && (
        <div className="personal-details">
          <h1 className="title">Enter Your Personal Details</h1>
          {userType === 'patient' && <PatientRegistration />}
          {userType === 'doctor' && <DoctorRegistration />}
        </div>
      )}
    </div>

  );
};

export default RegistrationPage;
