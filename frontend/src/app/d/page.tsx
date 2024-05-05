"use client"

import UploadFile from "./UploadFile";
import useSigner from "../state/signer";
import PatientRequestForm from "./PatientRequestForm";
import PendingRequests from "./PendingRequests";

export default function Page() {
  const {signer, contract } = useSigner();
  return (
    <div>
      Doctor Home
      <UploadFile contract={contract}/>
      <PatientRequestForm/>
      <PendingRequests/>
    </div>
  )
}