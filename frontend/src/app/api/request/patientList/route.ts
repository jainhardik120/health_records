import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
  try {
    const result = await sql`SELECT address FROM patient`;

    const patientAddresses = result.rows.map(row => row.address);

    return new Response(JSON.stringify(patientAddresses), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
