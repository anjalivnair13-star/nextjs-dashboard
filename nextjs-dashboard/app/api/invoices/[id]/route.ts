import { mockInvoices } from '@/app/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const invoice = mockInvoices.find(
      (invoice) => invoice.id === id,
    );

    if (!invoice) {
      return Response.json(
        { error: 'Invoice not found' },
        { status: 404 },
      );
    }

    return Response.json(invoice);
  } catch (error) {
    console.error('GET /api/invoices/[id] error:', error);

    return Response.json(
      { error: 'Failed to fetch invoice' },
      { status: 500 },
    );
  }
}
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const invoiceIndex = mockInvoices.findIndex(
      (invoice) => invoice.id === id,
    );

    if (invoiceIndex === -1) {
      return Response.json(
        { error: 'Invoice not found' },
        { status: 404 },
      );
    }

    // Update the existing invoice
    mockInvoices[invoiceIndex] = {
      ...mockInvoices[invoiceIndex],
      customer_id: body.customer_id,
      amount: body.amount,
      status: body.status,
    };

    return Response.json(
      mockInvoices[invoiceIndex],
      { status: 200 },
    );
  } catch (error) {
    console.error('PUT /api/invoices/[id] error:', error);

    return Response.json(
      { error: 'Failed to update invoice' },
      { status: 500 },
    );
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const invoiceIndex = mockInvoices.findIndex(
      (invoice) => invoice.id === id,
    );

    if (invoiceIndex === -1) {
      return Response.json(
        {
          error: 'Invoice not found',
        },
        {
          status: 404,
        },
      );
    }

    mockInvoices.splice(invoiceIndex, 1);

    return Response.json({
      message: 'Invoice deleted successfully',
    });
  } catch (error) {
    console.error(
      'DELETE /api/invoices/[id] error:',
      error,
    );

    return Response.json(
      {
        error: 'Failed to delete invoice',
      },
      {
        status: 500,
      },
    );
  }
}