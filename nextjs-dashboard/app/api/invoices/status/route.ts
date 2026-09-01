import { mockInvoices } from '@/app/lib/mock-data';

export async function GET() {
  const paid = mockInvoices
    .filter((invoice) => invoice.status === 'paid')
    .reduce((total, invoice) => total + invoice.amount, 0);

  const pending = mockInvoices
    .filter((invoice) => invoice.status === 'pending')
    .reduce((total, invoice) => total + invoice.amount, 0);

  return Response.json({
    paid,
    pending,
  });
}