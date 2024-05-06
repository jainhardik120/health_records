"use client"

import useSigner from "@/app/state/signer";
import DPendingRequests from "../DoctorComponents/PendingRequests";
import PPendingRequests from "../PatientComponents/PendingRequests"

export default function Page() {
  const { type } = useSigner();
  return (
    <>
      {type === 1 && (
        <>
          <DPendingRequests/>
        </>
      )}
      {type === 2 && (
        <>
          <PPendingRequests/>
        </>
      )}
    </>
  )
};