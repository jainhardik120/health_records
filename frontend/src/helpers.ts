import { sql } from '@vercel/postgres';
import { Readable } from 'stream';
import pinataSDK from "@pinata/sdk";
import { ReadStream, createReadStream, createWriteStream } from 'fs';
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT_KEY });

export const ErrorResponse = (error: any, statusCode: number) => {
  return new Response(JSON.stringify({ error: error.toString() }), { status: statusCode })
}

export const SuccessResponse = () => {
  return new Response(JSON.stringify({ success: true }), { status: 201 })
}

const uploadToLocal = async (fileStream: Readable): Promise<string> => {
  const currentTime = new Date().getTime();
  const fileName = `file_${currentTime}_${Math.floor(Math.random() * 1000)}`;
  const filePath = `./uploads/${fileName}`;
  const writeStream = createWriteStream(filePath);
  fileStream.pipe(writeStream);
  return new Promise((resolve, reject) => {
    writeStream.on('finish', async () => {
      try {
        resolve(fileName);
      } catch (err) {
        reject(err);
      }
    });
    writeStream.on('error', reject);
  });
}

const fetchFromLocal = async (ipfsHash: string): Promise<ArrayBuffer> => {
  const filePath = `./uploads/${ipfsHash}`;
  return new Promise((resolve, reject) => {
    const fileStream = createReadStream(filePath);
    const chunks: Uint8Array[] = [];

    fileStream.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    fileStream.on('end', () => {
      const buffer = Buffer.concat(chunks);
      resolve(buffer.buffer);
    });

    fileStream.on('error', reject);
  });
};

export const fetchFileFromIPFS = async (ipfsHash: string) => {
  return fetchFromLocal(ipfsHash);
  // const res = await fetch(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
  // if (!res.ok) {
  //   throw new Error(`Failed to fetch file from IPFS. Status: ${res.status}`);
  // }
  // return res.arrayBuffer();
};

export const uploadFileToIPFS = async (fileStream: Readable, fileName: string) => {
  return uploadToLocal(fileStream);
  // const pinataRes = await pinata.pinFileToIPFS(fileStream, {
  //   pinataMetadata: {
  //     name: fileName
  //   },
  //   pinataOptions: {
  //     cidVersion: 0
  //   }
  // })
  // return pinataRes.IpfsHash
}


export const getKey = async (address: string) => {
  const { rows } = await sql`SELECT * FROM keys WHERE address = ${address as string}`;
  if (rows.length === 0) {
    throw new Error("Key not found");
  }
  const privateKey: string = rows[0].key;
  const key = Buffer.from(privateKey, 'hex');
  return key;
}

export const pinJSONToIPFS = async (body: any) => {
  const response = await pinata.pinJSONToIPFS(body);
  return response.IpfsHash;
}