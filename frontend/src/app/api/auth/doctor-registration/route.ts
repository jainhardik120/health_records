import { sql } from '@vercel/postgres';

import { randomBytes } from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { address, firstName, lastName, email, specialization, clinicAddress, clinicContact } = body;

    const existingPatient = await sql`SELECT * FROM patient WHERE address = ${address}`;
    const existingDoctor = await sql`SELECT * FROM doctor WHERE address = ${address}`;

    if (existingPatient.rows.length > 0 || existingDoctor.rows.length > 0) {
      return new Response(JSON.stringify({ error: 'Address already exists as a patient or doctor' }), { status: 400 });
    }

    await sql`
      INSERT INTO doctor (address, first_name, last_name, email, specialization, clinic_address, clinic_contact)
      VALUES (${address}, ${firstName}, ${lastName}, ${email}, ${specialization}, ${clinicAddress}, ${clinicContact})
    `;
    const publicKey = randomBytes(32).toString('hex');
    await sql`INSERT INTO keys (key, address) VALUES (${publicKey}, ${address})`;
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
