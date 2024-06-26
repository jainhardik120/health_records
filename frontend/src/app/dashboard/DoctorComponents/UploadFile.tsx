"use client"

import { ChangeEvent, FormEvent, useState } from "react";
import TextInput from "../../components/TextInput";
import { TransactionResponse } from "ethers";
import { Contract } from "ethers";
import { toast } from "react-toastify";


interface UploadFileProps {
  contract: Contract,
  closePopup: () => void
}

const UploadFile: React.FC<UploadFileProps> = ({ contract, closePopup }) => {

  const [file, setFile] = useState<File | null>(null);
  const [patientAddress, setPatientAddress] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    const id = toast.loading("Uploading File");
    try {
      const formData = new FormData();
      formData.append("address", patientAddress);
      formData.append("file", file);
      const response = await fetch("/api/encryptFile", {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error || 'Failed to upload file');
      }
      const result = await response.json();
      const transaction: TransactionResponse = await contract.createMedicalRecord(patientAddress, result.hash, file.name);
      toast.update(id, { render: "Waiting for Transaction to be validated", type: "info", isLoading: true });
      await transaction.wait();
      toast.update(id, { render: "File Uploaded Successfully", type: "success", isLoading: false });
      closePopup();
    } catch (error: any) {
      toast.update(id, { render: error.message || "Error Uploading File", type: "error", isLoading: false })
    }
    toast.dismiss(id);
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  }

  return (
    <>
      <div className="popup-container">
        <div className="popup">
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
            <div className="flex justify-between">
              <button disabled={!file} className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded" type="submit">
                Upload
              </button>
              <button onClick={closePopup} className="hover:bg-gray-800 text-white py-2 px-4 rounded bg-gray-900">Close</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default UploadFile;