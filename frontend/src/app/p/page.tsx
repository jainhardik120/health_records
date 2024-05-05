"use client"

import { useEffect, useState } from "react"
import useSigner from "../state/signer"
import PendingRequests from "./PendingRequests";
import { DisplayRecords } from "./DisplayRecords";

export interface MedicalRecord {
  hash: string,
  creationTime: Date
}

export default function Page() {
  const { address, contract } = useSigner();
  const [Records, setRecords] = useState<MedicalRecord[]>([]);
  useEffect(() => {
    const getRecords = async () => {
      const res = await contract.getValidRecords(address);
      setRecords(
        res.map((item: any[], i: any) => {
          return ({
            hash: item[3],
            creationTime: item[1]
          })
        })
      )
    }
    if (address) {
      getRecords();
    }
  }, [address, contract])
  return (
    <div>
      <DisplayRecords Records={Records} address={address} />
      <PendingRequests address={address} Records={Records}/>
    </div>
  )
}