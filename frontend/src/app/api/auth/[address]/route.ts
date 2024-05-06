import { ErrorResponse } from "@/helpers";
import { sql } from "@vercel/postgres";

export const dynamic = 'force-dynamic'

export async function GET(request: Request, { params }: { params: { address: string } }) {
  const address = params.address;
  try {
    const { rows } = await sql`SELECT * FROM registeredaddresses WHERE address = ${address}`;
    if (rows.length == 0) {
      return Response.json({ isNew: true });
    } else {
      return Response.json({ isNew: false, type: rows[0].type });
    }
  } catch (error) {
    return ErrorResponse(error, 500);
  }
}