"use client";

import useSigner from "@/app/state/signer";
import { MedicalRecord } from "./PatientHome";
import { downloadFile } from '@/downloadFile';

interface DisplayRecordsProps {
  Records: MedicalRecord[],
  address?: string
}

export const DisplayRecords: React.FC<DisplayRecordsProps> = ({ Records, address }) => {
  const { signer } = useSigner();
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
                  <button onClick={() => { if (address && signer) { downloadFile(item.hash, item.fileName, address, signer) } }} className="text-indigo-600 hover:text-indigo-900">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
