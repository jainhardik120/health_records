"use client"

import { useEffect, useState } from "react"
import { toast } from "react-toastify";


interface DoctorProps {
  details: {
    address: string;
    first_name: string;
    last_name: string;
    email: string;
    specialization: string;
    clinic_address: string;
    clinic_contact: string;
    type: number;
  };
}

interface PatientProps {
  details: {
    address: string;
    first_name: string;
    last_name: string;
    email: string;
    dob: string;
    gender: string;
    paddress: string;
    contact: string;
    type: number;
  };
}

const DoctorDetails: React.FC<DoctorProps> = ({ details }) => {
  return (
    <div>
      <h2>Doctor Details</h2>
      <ul>
        <li><strong>Address:</strong> {details.address}</li>
        <li><strong>Name:</strong> {details.first_name} {details.last_name}</li>
        <li><strong>Email:</strong> {details.email}</li>
        <li><strong>Specialization:</strong> {details.specialization}</li>
        <li><strong>Clinic Address:</strong> {details.clinic_address}</li>
        <li><strong>Clinic Contact:</strong> {details.clinic_contact}</li>
      </ul>
    </div>
  );
};

const PatientDetails: React.FC<PatientProps> = ({ details }) => {
  return (
    <div>
      <h2>Patient Details</h2>
      <ul>
        <li><strong>Address:</strong> {details.address}</li>
        <li><strong>Name:</strong> {details.first_name} {details.last_name}</li>
        <li><strong>Email:</strong> {details.email}</li>
        <li><strong>Date of Birth:</strong> {details.dob}</li>
        <li><strong>Gender:</strong> {details.gender}</li>
        <li><strong>Permanent Address:</strong> {details.paddress}</li>
        <li><strong>Contact:</strong> {details.contact}</li>
      </ul>
    </div>
  );
};

const UserDetails: React.FC<{ details: any }> = ({ details }) => {
  return (
    <div>
      {details.type === 1 && <DoctorDetails details={details} />}
      {details.type === 2 && <PatientDetails details={details} />}
    </div>
  );
};

export default function Page({ params }: { params: { address: string } }) {
  const [details, setdetails] = useState({});
  useEffect(() => {
    const func = async () => {
      try {
        const response = await fetch(`/api/details/${params.address}`);
        const body = await response.json();
        if (!response.ok) {
          throw new Error(body.error);
        }
        console.log(body)
        setdetails(body);
      } catch (error: any) {
        toast.error(error.message || "Error Searching for User")
      }
    }
    func();
  }, [params.address]);

  return (
    <>
      <div className="flex w-full justify-center mt-4">
        <UserDetails details={details}/>
      </div>
    </>
  )
};