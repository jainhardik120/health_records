import { sql } from '@vercel/postgres';
import { id } from 'ethers';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await sql`
      DELETE FROM doctor_patient_requests WHERE request_id = ${params.id}
    `;
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
