"use client";
import Link from "next/link";

interface AddressLinkProps {
  hash: string;
}
export const AddressLink: React.FC<AddressLinkProps> = ({ hash }) => {
  return (<Link href={`/info/${hash}`} className="text-violet-800">{hash}</Link>);
};
