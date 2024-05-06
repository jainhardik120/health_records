"use client"

import useSigner from "../../app/state/signer";
import DoctorHome from "./DoctorComponents/DoctorHome";
import PatientHome from "./PatientComponents/PatientHome";

export default function Page() {
  const { type } = useSigner();
  return (
    <>
      {type === 1 && (
        <>
          <DoctorHome />
        </>
      )}
      {type === 2 && (
        <>
          <PatientHome />
        </>
      )}
    </>
  )
};