"use client"

import useSigner from "../../../app/state/signer";
import React, { useState, useEffect } from "react";
import RecordList from "./RecordList";
import UploadFile from "./UploadFile";
import Button from "../../../app/components/Button";

export type SharedRecord = {
  patient: string;
  creationTime: number;
  expiryTime: number;
  metahash: string;
}

const DoctorHome: React.FC = () => {
  const { contract, address } = useSigner();

  const [uploadPopupOpened, setUploadPopupOpened] = useState(false);
  const [Records, setRecords] = useState<SharedRecord[]>([]);

  useEffect(() => {
    const getRecords = async () => {
      const res = await contract.getValidSharedRecords();
      setRecords(
        res.map((item: any[], i: any) => {
          return ({
            patient: item[0],
            creationTime: Number(item[1]),
            expiryTime: Number(item[2]),
            metahash: item[3]
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
      <RecordList records={Records} />
      {uploadPopupOpened && (
        <UploadFile contract={contract} closePopup={() => setUploadPopupOpened(false)} />
      )}
      <div className="flex justify-center p-4">
        <Button onClick={() => setUploadPopupOpened(true)}>Upload New Records</Button>
      </div>
    </div>
  )
}

export default DoctorHome;