import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

async function fetchApi<T>(endpoint: string): Promise<T> {
  const url = `${baseUrl}${endpoint}`;

  console.log(`Fetching API: ${url}`);

  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error('API Request Failed:', {
      url,
      status: response.status,
      statusText: response.statusText,
      error: errorText,
    });

    throw new Error(
      `Failed to fetch ${endpoint}: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export async function fetchRevenue() {
  try {
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await fetchApi<Revenue[]>('/api/revenue');

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
     console.log('Fetching latest invoices...');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await fetchApi<LatestInvoiceRaw[]>(
      '/api/invoices/latest',
    );

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));

    return latestInvoices;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // Start all API calls at the same time
    const invoiceCountPromise = fetchApi<{ count: number }>(
      '/api/invoices/count',
    );

    const customerCountPromise = fetchApi<{ count: number }>(
      '/api/customers/count',
    );

    const invoiceStatusPromise = fetchApi<{
      paid: number;
      pending: number;
    }>('/api/invoices/status');

    // Wait until all API calls are completed
    const [
      invoiceCountData,
      customerCountData,
      invoiceStatusData,
    ] = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = invoiceCountData.count;
    const numberOfCustomers = customerCountData.count;

    const totalPaidInvoices = formatCurrency(
      invoiceStatusData.paid,
    );

    const totalPendingInvoices = formatCurrency(
      invoiceStatusData.pending,
    );

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  try {
    const searchParams = new URLSearchParams({
      query,
      page: currentPage.toString(),
    });

    const data = await fetchApi<{
      invoices: InvoicesTable[];
      totalPages: number;
    }>(`/api/invoices?${searchParams}`);

    return data.invoices;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const searchParams = new URLSearchParams({
      query,
      page: '1',
    });

    const data = await fetchApi<{
      invoices: InvoicesTable[];
      totalPages: number;
    }>(`/api/invoices?${searchParams}`);

    return data.totalPages;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(
      'Failed to fetch total number of invoices.',
    );
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const invoice = await fetchApi<InvoiceForm>(
      `/api/invoices/${id}`,
    );

    return {
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    };
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await fetchApi<CustomerField[]>(
      '/api/customers',
    );

    return customers;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const searchParams = new URLSearchParams({
      query,
    });

    const data = await fetchApi<CustomersTableType[]>(
      `/api/customers?${searchParams}`,
    );

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch customer table.');
  }
}