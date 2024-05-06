"use client";

import { MedicalRecord } from "./PatientHome";

interface DisplayRecordsProps {
  Records: MedicalRecord[],
  address?: string
}

export const DisplayRecords: React.FC<DisplayRecordsProps> = ({ Records, address }) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hash</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creation Time</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creator</th>
              <th className="px-6 py-3 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Records && Records.map((item, i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap">{item.hash}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.fileName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(item.creationTime * 1000).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.creator}</td>
                <td className="px-6 py-4 whitespace-nowrap">
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
                      console.error(error);
                    }
                  }} className="text-indigo-600 hover:text-indigo-900">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  );
};
