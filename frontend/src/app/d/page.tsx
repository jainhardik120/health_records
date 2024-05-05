"use client"

import UploadFile from "./UploadFile";
import HealthRecords from "../../artifacts/HealthRecords.json";
import useSigner from "../state/signer";
import { Contract } from "ethers";
import PatientRequestForm from "./PatientRequestForm";
import PendingRequests from "./PendingRequests";

export default function Page() {
  const {signer } = useSigner();
  const contract = new Contract("0x8fcaAAE9464F37f46Ba877c847660f4d8e14595d", HealthRecords.abi, signer);
  
  return (
    <div>
      Doctor Home
      <UploadFile contract={contract}/>
      <PatientRequestForm/>
      <PendingRequests/>
    </div>
  )
}