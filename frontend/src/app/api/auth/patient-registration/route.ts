import { ErrorResponse, SuccessResponse } from '@/helpers';
import { sql } from '@vercel/postgres';
import { randomBytes } from 'crypto';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { address, firstName, lastName, email, dob, gender, paddress, contact } = body;
    if (!address || !firstName || !lastName || !email || !dob || !gender || !paddress || !contact) {
      return ErrorResponse('Missing required fields', 400);
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return ErrorResponse('Invalid email format', 400);
    }
    const existingPatient = await sql`SELECT * FROM patient WHERE address = ${address}`;
    const existingDoctor = await sql`SELECT * FROM doctor WHERE address = ${address}`;
    if (existingPatient.rows.length > 0 || existingDoctor.rows.length > 0) {
      return ErrorResponse('Address already exists as a patient or doctor', 400);
    }
    const publicKey = randomBytes(32).toString('hex');
    await sql`
      INSERT INTO patient (address, first_name, last_name, email, dob, gender, paddress, contact)
      VALUES (${address}, ${firstName}, ${lastName}, ${email}, ${dob}, ${gender}, ${paddress}, ${contact})
    `;
    await sql`INSERT INTO keys (key, address) VALUES (${publicKey}, ${address})`;
    await sql`INSERT INTO registeredaddresses (type, address) VALUES (2, ${address})`;
    return SuccessResponse();
  } catch (error) {
    return ErrorResponse(error, 500);
  }
}
