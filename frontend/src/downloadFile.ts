"use client"

import { JsonRpcSigner } from "ethers";
import { toast } from "react-toastify";

export const downloadFile = async (itemhash: string, filename: string, taddress: string, signer: JsonRpcSigner) => {
  const id = toast.loading("Requesting File");
  try {
    const sign = await signer.signMessage(JSON.stringify({
      ipfsHash: itemhash,
      address: taddress,
      fileName: filename
    }));
    const response = await fetch(`/api/decryptFile?ipfsHash=${itemhash}&address=${taddress}&filename=${filename}&sign=${sign}`);
    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.error || 'Failed to download file');
    }
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    toast.update(id, { render: "File Downloaded Successfully", type: "success", isLoading: false });
  } catch (error: any) {
    toast.update(id, { render: error.message, type: "error", isLoading: false });
  }
  toast.dismiss(id);
};
