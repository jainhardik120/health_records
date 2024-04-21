import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { address, firstName, lastName, email, dob, gender, paddress, contact } = body;

    // Check if the address already exists as a patient or doctor
    const existingPatient = await sql`SELECT * FROM patient WHERE address = ${address}`;
    const existingDoctor = await sql`SELECT * FROM doctor WHERE address = ${address}`;

    if (existingPatient.rows.length > 0 || existingDoctor.rows.length > 0) {
      return new Response(JSON.stringify({ error: 'Address already exists as a patient or doctor' }), { status: 400 });
    }

    // Insert new patient into the database
    await sql`
      INSERT INTO patient (address, first_name, last_name, email, dob, gender, paddress, contact)
      VALUES (${address}, ${firstName}, ${lastName}, ${email}, ${dob}, ${gender}, ${paddress}, ${contact})
    `;

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
