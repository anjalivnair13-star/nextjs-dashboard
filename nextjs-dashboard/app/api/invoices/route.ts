import { NextRequest } from 'next/server';
import {
  mockCustomers,
  mockInvoices,
} from '@/app/lib/mock-data';

const ITEMS_PER_PAGE = 6;

export async function GET(request: NextRequest) {
  const query =
    request.nextUrl.searchParams
      .get('query')
      ?.toLowerCase() || '';

  const currentPage =
    Number(request.nextUrl.searchParams.get('page')) || 1;

  const invoicesWithCustomers = mockInvoices.map((invoice) => {
    const customer = mockCustomers.find(
      (customer) => customer.id === invoice.customer_id,
    );

    return {
      id: invoice.id,
      amount: invoice.amount,
      date: invoice.date,
      status: invoice.status,
      name: customer?.name || '',
      email: customer?.email || '',
      image_url: customer?.image_url || '',
    };
  });

  const filteredInvoices = invoicesWithCustomers.filter(
    (invoice) =>
      invoice.name.toLowerCase().includes(query) ||
      invoice.email.toLowerCase().includes(query) ||
      invoice.amount.toString().includes(query) ||
      invoice.date.toString().includes(query) ||
      invoice.status.toLowerCase().includes(query),
  );

  const sortedInvoices = filteredInvoices.sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime(),
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const invoices = sortedInvoices.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return Response.json({
    invoices,
    totalPages: Math.ceil(
      filteredInvoices.length / ITEMS_PER_PAGE,
    ),
  });
}
// POST - Create a new invoice
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newInvoice = {
      id: crypto.randomUUID(),
      customer_id: body.customer_id,
      amount: body.amount,
      status: body.status,
      date: body.date,
    };

    mockInvoices.push(newInvoice);

    return Response.json(newInvoice, {
      status: 201,
    });
  } catch (error) {
    console.error('POST /api/invoices error:', error);

    return Response.json(
      {
        error: 'Failed to create invoice',
      },
      {
        status: 500,
      },
    );
  }
}