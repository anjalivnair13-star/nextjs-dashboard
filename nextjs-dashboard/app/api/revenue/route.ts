import { mockRevenue } from '@/app/lib/mock-data';

export async function GET() {
  return Response.json(mockRevenue);
}