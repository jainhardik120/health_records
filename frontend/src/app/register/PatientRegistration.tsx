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
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateDOB = (dob: string) => {
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dobRegex.test(dob);
  };

  const validateContact = (contact: string) => {
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(contact);
  };

  const handleSubmit = () => {
    if (!address) {
      // MetaMask is not connected, prevent form submission
      setError('MetaMask is not connected. Please connect MetaMask to submit the form.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (!validateDOB(dob)) {
      setError('Invalid date of birth format (YYYY-MM-DD)');
      return;
    }
    if (gender !== 'male' && gender !== 'female') {
      setError('Gender must be either "male" or "female"');
      return;
    }
    if (!validateContact(contact)) {
      setError('Contact number must be 10 digits');
      return;
    }

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

    // Reset error state
    setError('');

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

    setTimeout(() => {
      setSuccessMessage('Registration successful!');
    }, 1000);
  };


  return (
    <div>
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
            label="Date of Birth"
            className="input-field"
            id="dob"
            value={dob}
            onChange={setDOB}
          />
        </div>
        <div className="form-group">
          <TextInput
            label="Gender"
            className="input-field"
            id="gender"
            value={gender}
            onChange={setGender}
          />
        </div>
        <div className="form-group">
          <TextInput
            label="Address"
            className="input-field"
            id="address"
            value={paddress}
            onChange={setAddress}
          />
        </div>
        <div className="form-group">
          <TextInput
            label="Contact Number"
            className="input-field"
            id="contact"
            value={contact}
            onChange={setContact}
          />
        </div>
        <Button className="w-full" onClick={handleSubmit}>
          Register
        </Button>
        {/* Error message */}
        {error && <p className="error-message">{error}</p>}
        {/* Success message */}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default PatientRegistration;