CREATE TABLE registeredaddresses (
    type INTEGER NOT NULL,
    address VARCHAR(255) PRIMARY KEY
);
CREATE TABLE doctor_patient_requests (
    request_id SERIAL PRIMARY KEY,
    doctor_address VARCHAR(255) NOT NULL,
    patient_address VARCHAR(255) NOT NULL,
    request_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_address) REFERENCES registeredaddresses(address),
    FOREIGN KEY (patient_address) REFERENCES registeredaddresses(address)
);
CREATE TABLE doctor (
    address VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    specialization VARCHAR(255) NOT NULL,
    clinic_address TEXT NOT NULL,
    clinic_contact VARCHAR(15) NOT NULL
);
CREATE TABLE patient (
    address VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    dob DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    paddress TEXT NOT NULL,
    contact VARCHAR(15) NOT NULL
);
CREATE TABLE keys (
    key VARCHAR(255) NOT NULL,
    address VARCHAR(255) PRIMARY KEY,
    FOREIGN KEY (address) REFERENCES registeredaddresses(address)
);
