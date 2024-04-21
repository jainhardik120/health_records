import formidable from 'formidable';
import { tmpdir } from "os";
import { createReadStream, statSync } from 'fs';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { randomBytes, createCipheriv } from 'crypto';
import pinataSDK from "@pinata/sdk";
import { sql } from "@vercel/postgres";
import { Readable } from 'stream';
export const dynamic = 'force-dynamic'

const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT_KEY });


export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data: any = await new Promise((resolve, reject) => {
      const form = formidable({ multiples: true, uploadDir: tmpdir() });
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ ...fields, ...files });
      });
    });
    const { rows } = await sql`SELECT * FROM keys WHERE address = ${data.address[0]}`;
    const publicKey: String = rows[0].key;
    const key = Buffer.from(publicKey, 'hex');
    console.log(key);
    const algorithm = 'aes-256-cbc';
    const iv = randomBytes(16);
    const { filepath, originalFilename } = data.file[0];
    console.log(originalFilename);
    const input = createReadStream(filepath);
    const cipher = createCipheriv(algorithm, key, iv);
    const fileSize = statSync(filepath).size;
    const buffer = Buffer.alloc(fileSize);
    let bytesRead = 0;
    input.on('data', (chunk: Buffer) => {
      chunk.copy(buffer, bytesRead);
      bytesRead += chunk.length;
    });
    input.on('end', async () => {
      const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
      const readableStream = Readable.from(result);
      const pinataRes = await pinata.pinFileToIPFS(readableStream, {
        pinataMetadata: {
          name: originalFilename
        },
        pinataOptions: {
          cidVersion: 0
        }
      })
      return res.json({
        hash: pinataRes.IpfsHash
      })
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
}
export default handler;