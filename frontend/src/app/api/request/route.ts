import { ErrorResponse, SuccessResponse } from '@/helpers';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { doctorAddress, patientAddress, message } = body;
    if (!doctorAddress || typeof doctorAddress !== 'string' ||
      !patientAddress || typeof patientAddress !== 'string' ||
      !message || typeof message !== 'string') {
      return ErrorResponse('Invalid parameters', 400);
    }
    const doctorResult = await sql`
      SELECT * FROM registeredaddresses WHERE address = ${doctorAddress} AND type = 1
    `;
    if (doctorResult.rows.length === 0) {
      return ErrorResponse('Invalid doctor address', 400);
    }
    const patientResult = await sql`
      SELECT * FROM registeredaddresses WHERE address = ${patientAddress} AND type = 2
    `;
    if (patientResult.rows.length === 0) {
      return ErrorResponse('Invalid patient address', 400);
    }
    await sql`
      INSERT INTO doctor_patient_requests (doctor_address, patient_address, message)
      VALUES (${doctorAddress}, ${patientAddress}, ${message})
    `;
    return SuccessResponse();
  } catch (error) {
    return ErrorResponse(error, 500);
  }
}
