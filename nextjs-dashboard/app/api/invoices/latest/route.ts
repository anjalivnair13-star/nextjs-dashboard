import {
  mockCustomers,
  mockInvoices,
} from '@/app/lib/mock-data';

export async function GET() {
  const latestInvoices = mockInvoices
    .map((invoice) => {
      const customer = mockCustomers.find(
        (customer) => customer.id === invoice.customer_id,
      );

      return {
        id: invoice.id,
        amount: invoice.amount,
        name: customer?.name || '',
        email: customer?.email || '',
        image_url: customer?.image_url || '',
        date: invoice.date,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime(),
    )
    .slice(0, 5);

  return Response.json(latestInvoices);
}