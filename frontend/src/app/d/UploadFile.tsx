"use client"

import { ChangeEvent, FormEvent, useState } from "react";
import TextInput from "../components/TextInput";
import { TransactionResponse } from "ethers";
import { Contract } from "ethers";


interface UploadFileProps {
  contract : Contract
}

const UploadFile: React.FC<UploadFileProps> = ({contract}) => {

  const [file, setFile] = useState<File | null>(null);
  const [patientAddress, setPatientAddress] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("address", patientAddress);
      formData.append("file", file);
      const response = await fetch("/api/encryptFile", {
        method: "POST",
        body: formData
      });
      if(response.ok){
        const result = await response.json();
        const transaction : TransactionResponse = await contract.createMedicalRecord(patientAddress, result.hash, file.name);
        await transaction.wait();
        alert("Created Document Successfully");
      }else{
        console.error("Error Creating File");
      }
    } catch (error) {
      console.error("Error Creating File", error);
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  }

  return (
    <>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <TextInput label="Patient Address" id="patientaddress" value={patientAddress} onChange={setPatientAddress} />
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="uploadFile">
                File
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="uploadFile"
                type="file"
                onChange={handleFileChange}
              />
            </div>
            <button disabled={!file} className={`bg-black hover:bg-gray-800 text-white py-2 px-4 rounded`} type="submit">
              Upload
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UploadFile;