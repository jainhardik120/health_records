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
            {item.fileName}
            {item.creationTime.toString()}
            {item.creator}
            <button onClick={async () => {
              try {
                const response = await fetch(`/api/decryptFile?ipfsHash=${item.hash}&address=${address}&filename=${item.fileName}`);
                if (!response.ok) {
                  throw new Error('Failed to download file');
                }
                const blob = await response.blob();
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = item.fileName;
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
