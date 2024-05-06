import { ErrorResponse } from '@/helpers';
import { sql } from '@vercel/postgres';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const requestId = params.id;
    if (!requestId || isNaN(Number(requestId))) {
      return ErrorResponse('Invalid request ID', 400);
    }
    const result = await sql`
      SELECT * FROM doctor_patient_requests WHERE request_id = ${requestId}
    `;
    if (result.rows.length === 0) {
      return ErrorResponse('Request ID not found', 404);
    }
    await sql`
      DELETE FROM doctor_patient_requests WHERE request_id = ${requestId}
    `;
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return ErrorResponse(error, 500);
  }
}
