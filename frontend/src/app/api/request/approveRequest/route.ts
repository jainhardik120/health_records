import { sql } from '@vercel/postgres';
import { fetchFileFromIPFS, getKey, pinJSONToIPFS, uploadFileToIPFS } from "./../../../../helpers";
import { Readable } from 'stream';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import pinataSDK from "@pinata/sdk";


export async function POST(request: Request) {
  const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT_KEY });
  try {
    const body = await request.json();
    const { ipfsHashes, requestId } = body;
    if (!requestId || typeof requestId !== 'number') {
      return new Response(JSON.stringify({ message: 'Invalid request ID' }), { status: 400 });
    }
    if (!ipfsHashes || !Array.isArray(ipfsHashes) || ipfsHashes.length === 0) {
      return new Response(JSON.stringify({ message: 'Invalid IPFS Hashes' }), { status: 400 });
    }
    console.log(ipfsHashes);
    const pendingRequest = await sql`SELECT * FROM doctor_patient_requests WHERE request_id = ${requestId}`;
    if (pendingRequest.rows.length === 0) {
      return new Response(JSON.stringify({ message: 'Invalid request ID' }), { status: 400 });
    }
    const patient_address = pendingRequest.rows[0].patient_address;
    const doctor_address = pendingRequest.rows[0].doctor_address;
    const patientKey = await getKey(patient_address);
    const doctorKey = await getKey(doctor_address);

    let encryptedHashes: string[] = [];

    for (let i = 0; i < ipfsHashes.length; i++) {
      const encryptedData = await fetchFileFromIPFS(ipfsHashes[i] as string);
      const encryptedBuffer = Buffer.from(encryptedData);
      const iv = encryptedBuffer.subarray(0, 16);
      const decipher = createDecipheriv('aes-256-cbc', patientKey, iv);
      const decryptedData = Buffer.concat([decipher.update(encryptedBuffer.subarray(16)), decipher.final()]);
      const encryptionIv = randomBytes(16);
      const cipher = createCipheriv('aes-256-cbc', doctorKey, encryptionIv);
      const result = Buffer.concat([encryptionIv, cipher.update(decryptedData), cipher.final()]);
      const readableStream = Readable.from(result);
      const pinataRes = await uploadFileToIPFS(readableStream, ipfsHashes[i]);
      encryptedHashes = [...encryptedHashes, pinataRes];
    }
    
    const response = await pinJSONToIPFS({
      files : encryptedHashes,
      request : pendingRequest.rows[0]
    });
    return new Response(JSON.stringify({hash : response}), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
