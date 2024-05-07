"use client"

import { useEffect, useState } from "react"
import { toast } from "react-toastify";

export default function Page({ params }: { params: { address: string } }) {
  const [details, setdetails] = useState({});
  useEffect(() => {
    const func = async () => {
      try {
        const response = await fetch(`/api/details/${params.address}`);
        const body = await response.json();
        if (!response.ok) {
          throw new Error(body.error);
        }
        console.log(body)
        setdetails(body);
      } catch (error: any) {
        toast.error(error.message || "Error Searching for User")
      }
    }
    func();
  }, [params.address]);

  return (
    <>
      <div className="flex w-full justify-center mt-4">
        <ul>
          {Object.entries(details).map(([key, value]: [string, any]) => (
            <li key={key}>
              <strong>{key}: </strong> {value}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
};