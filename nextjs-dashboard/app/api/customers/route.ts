import { mockCustomers } from '@/app/lib/mock-data';

export async function GET() {
  return Response.json(mockCustomers);
}