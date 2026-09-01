import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = {
      numberOfInvoices: 10,
      numberOfCustomers: 5,
      totalPaidInvoices: 15000,
      totalPendingInvoices: 5000,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching card data:', error);

    return NextResponse.json(
      { error: 'Failed to fetch card data' },
      { status: 500 },
    );
  }
}