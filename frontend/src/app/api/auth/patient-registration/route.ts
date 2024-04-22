import { sql } from '@vercel/postgres';

import { randomBytes } from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { address, firstName, lastName, email, dob, gender, paddress, contact } = body;
    const existingPatient = await sql`SELECT * FROM patient WHERE address = ${address}`;
    const existingDoctor = await sql`SELECT * FROM doctor WHERE address = ${address}`;

    if (existingPatient.rows.length > 0 || existingDoctor.rows.length > 0) {
      return new Response(JSON.stringify({ error: 'Address already exists as a patient or doctor' }), { status: 400 });
    }
    const publicKey = randomBytes(32).toString('hex');
    // Insert new patient into the database
    await sql`
      INSERT INTO patient (address, first_name, last_name, email, dob, gender, paddress, contact)
      VALUES (${address}, ${firstName}, ${lastName}, ${email}, ${dob}, ${gender}, ${paddress}, ${contact})
    `;

    await sql`INSERT INTO keys (key, address) VALUES (${publicKey}, ${address})`;
    await sql`INSERT INTO registeredaddresses (type, address) VALUES (2, ${address})`;

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
