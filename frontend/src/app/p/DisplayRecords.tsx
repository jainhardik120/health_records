"use client";

import { MedicalRecord } from "./page";

interface DisplayRecordsProps {
  Records: MedicalRecord[],
  address?: string
}

export const DisplayRecords: React.FC<DisplayRecordsProps> = ({ Records, address }) => {
  return (
    <>
      {Records && Records.map((item, i) => {
        return (
          <div key={i}>
            {item.hash}
            <button onClick={async () => {
              try {
                const response = await fetch(`/api/decryptFile?ipfsHash=${item.hash}&address=${address}`);
                if (!response.ok) {
                  throw new Error('Failed to download file');
                }
                const blob = await response.blob();
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'decrypted_file';
                link.click();
              } catch (error) {
              }
            }}>
              Download
            </button>
          </div>
        );
      })}
    </>
  );
};
