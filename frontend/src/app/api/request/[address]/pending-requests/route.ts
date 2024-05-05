import { sql } from "@vercel/postgres";

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { address: string } }) {
  const address = params.address;

  try {
    // Check the type of the provided address
    const addressTypeResult = await sql`SELECT type FROM registeredaddresses WHERE address = ${address}`;

    if (addressTypeResult.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Address not found' }), { status: 404 });
    }

    const addressType = addressTypeResult.rows[0].type;

    let requestsResult;

    // Get the list of requests based on the type of address
    if (addressType === 2) {
      // Address is a patient
      requestsResult = await sql`SELECT * FROM doctor_patient_requests WHERE patient_address = ${address}`;
    } else if (addressType === 1) {
      // Address is a doctor
      requestsResult = await sql`SELECT * FROM doctor_patient_requests WHERE doctor_address = ${address}`;
    } else {
      // Invalid address type
      return new Response(JSON.stringify({ error: 'Invalid address type' }), { status: 400 });
    }

    const requests = requestsResult.rows;

    // Return the list of requests
    return new Response(JSON.stringify(requests), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
