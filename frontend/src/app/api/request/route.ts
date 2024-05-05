import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { doctorAddress, patientAddress, message } = body;
    await sql`
      INSERT INTO doctor_patient_requests (doctor_address, patient_address, message)
      VALUES (${doctorAddress}, ${patientAddress}, ${message})
    `;
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
