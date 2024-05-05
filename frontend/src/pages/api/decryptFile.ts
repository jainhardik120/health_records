import { tmpdir } from "os";
import { createWriteStream, createReadStream } from 'fs';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { createDecipheriv } from 'crypto';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { fetchFileFromIPFS, getKey } from './../../helpers';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { ipfsHash, address } = req.query;
    if (ipfsHash == undefined || address == undefined || typeof address !== 'string') {
      return res.status(404).json({ message: "Pass values for ipfshash and address" });
    }
    const key = await getKey(address);
    const encryptedData = await fetchFileFromIPFS(ipfsHash as string);
    const encryptedBuffer = Buffer.from(encryptedData);
    const iv = encryptedBuffer.subarray(0, 16);
    const encryptedStream = Readable.from(encryptedBuffer.subarray(16));
    const decryptedFilePath = `${tmpdir()}/${ipfsHash}_decrypted`;
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    const input = encryptedStream.pipe(decipher);
    const output = createWriteStream(decryptedFilePath);
    await pipeline(input, output);
    res.setHeader('Content-Disposition', 'attachment; filename=decrypted_file');
    res.setHeader('Content-Type', 'application/octet-stream');
    const decryptedFileStream = createReadStream(decryptedFilePath);
    decryptedFileStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
