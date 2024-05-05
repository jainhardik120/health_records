import formidable from 'formidable';
import { tmpdir } from "os";
import { createReadStream, statSync } from 'fs';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { randomBytes, createCipheriv } from 'crypto';
import { sql } from "@vercel/postgres";
import { Readable } from 'stream';
import { uploadFileToIPFS } from '@/helpers';
export const dynamic = 'force-dynamic'

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
      const hash = await uploadFileToIPFS(readableStream, originalFilename);
      return res.json({
        hash
      })
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
}
export default handler;