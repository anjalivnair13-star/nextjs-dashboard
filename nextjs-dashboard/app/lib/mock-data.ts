import {
  customers,
  invoices,
  revenue,
  users,
} from './placeholder-data';

export const mockCustomers = [...customers];

export const mockInvoices = invoices.map((invoice, index) => ({
  ...invoice,
  id: `invoice-${index + 1}`,
}));

export const mockRevenue = [...revenue];

export const mockUsers = [...users];