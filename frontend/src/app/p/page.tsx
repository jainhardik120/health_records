"use client"
import { Contract } from "ethers"
import { useEffect, useState } from "react"
import useSigner from "../state/signer"

import HealthRecords from "../../artifacts/HealthRecords.json";

interface DisplayRecordsProps {
  contract: Contract
}

interface MedicalRecord {
  hash: String,
  creationTime: Date
}


const DisplayRecords: React.FC<DisplayRecordsProps> = ({ contract }) => {
  const { address } = useSigner();
  const [Records, setRecords] = useState<MedicalRecord[]>();
  useEffect(() => {
    const getRecords = async () => {
      const res = await contract.getValidRecords(address);
      setRecords(
        res.map((item, i) => {
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
  }, [contract, address])

  return (
    <>
      {Records && Records.map((item, i) => {
        return (
          <div key={i}>
            {item.hash}
            <button onClick={async () => {
              const res = await fetch(`/api/decryptFile?ipfsHash=${item.hash}&address=${address}`);
              
            }}>
              Download
            </button>
          </div>
        )
      })}
    </>
  )
}

export default function Page() {
  const { signer } = useSigner();
  const contract = new Contract("0x8fcaAAE9464F37f46Ba877c847660f4d8e14595d", HealthRecords.abi, signer);
  return (
    <div>
      <DisplayRecords contract={contract} />
    </div>
  )
}