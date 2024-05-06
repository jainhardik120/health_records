"use client"

import useSigner from "../../../app/state/signer";
import { useEffect, useState } from "react"
import { DisplayRecords } from "./DisplayRecords";

export type MedicalRecord = {
  hash: string,
  creationTime: number,
  fileName : string,
  creator : string
}

const PatientHome: React.FC = () => {
  const { address, contract } = useSigner();
  const [Records, setRecords] = useState<MedicalRecord[]>([]);
  useEffect(() => {
    const getRecords = async () => {
      const res = await contract.getValidRecords();
      setRecords(
        res.map((item: any[], i: any) => {
          return ({
            hash: item[2],
            creationTime: Number(item[1]),
            fileName : item[4],
            creator : item[3]
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
    </div>
  )
}

export default PatientHome;