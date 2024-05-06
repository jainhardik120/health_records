import { ErrorResponse, SuccessResponse } from '@/helpers';
import { sql } from '@vercel/postgres';

import { randomBytes } from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { address, firstName, lastName, email, specialization, clinicAddress, clinicContact } = body;
    
    if (!address || !firstName || !lastName || !email || !specialization || !clinicAddress || !clinicContact) {
      return ErrorResponse('Missing required fields', 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return ErrorResponse('Invalid email format', 400);
    }

    const existingPatient = await sql`SELECT * FROM patient WHERE address = ${address} OR email = ${email}`;
    const existingDoctor = await sql`SELECT * FROM doctor WHERE address = ${address} OR email = ${email}`;
    if (existingPatient.rows.length > 0 || existingDoctor.rows.length > 0) {
      return ErrorResponse('Address or email already exists as a patient or doctor', 400);
    }

    const publicKey = randomBytes(32).toString('hex');
    
    await sql`
      INSERT INTO doctor (address, first_name, last_name, email, specialization, clinic_address, clinic_contact)
      VALUES (${address}, ${firstName}, ${lastName}, ${email}, ${specialization}, ${clinicAddress}, ${clinicContact})
    `;

    await sql`INSERT INTO keys (key, address) VALUES (${publicKey}, ${address})`;

    await sql`INSERT INTO registeredaddresses (type, address) VALUES (1, ${address})`;

    return SuccessResponse();
  } catch (error) {
    // Return error response
    return ErrorResponse(error, 500);
  }
}
