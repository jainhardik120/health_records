import { ErrorResponse } from "@/helpers";
import { sql } from "@vercel/postgres";

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { address: string } }) {
  const address = params.address;

  try {
    const addressTypeResult = await sql`SELECT type FROM registeredaddresses WHERE address = ${address}`;
    if (addressTypeResult.rows.length === 0) {
      return ErrorResponse('Address not found', 404);
    }

    const addressType = addressTypeResult.rows[0].type;

    let requestsResult;
    if (addressType === 2) {
      requestsResult = await sql`SELECT * FROM doctor_patient_requests WHERE patient_address = ${address}`;
    } else if (addressType === 1) {
      requestsResult = await sql`SELECT * FROM doctor_patient_requests WHERE doctor_address = ${address}`;
    } else {
      return ErrorResponse('Invalid address type', 400);
    }

    const requests = requestsResult.rows;

    return new Response(JSON.stringify(requests), { status: 200 });
  } catch (error) {
    return ErrorResponse(error, 500);
  }
}
