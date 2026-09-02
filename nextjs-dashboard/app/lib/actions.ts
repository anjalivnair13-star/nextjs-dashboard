'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),

  customerId: z.string({
    error: 'Please select a customer.',
  }),

  amount: z.coerce
    .number()
    .gt(0, {
      error: 'Please enter an amount greater than $0.',
    }),

  status: z.enum(['pending', 'paid'], {
    error: 'Please select an invoice status.',
  }),

  date: z.string(),
});

const CreateInvoice = FormSchema.omit({
  id: true,
  date: true,
});

const UpdateInvoice = FormSchema.omit({
  id: true,
  date: true,
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(
  prevState: State,
  formData: FormData,
) {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    const response = await fetch(
      'http://localhost:3000/api/invoices',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customerId,
          amount: amountInCents,
          status,
          date,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to create invoice');
    }
  } catch (error) {
    console.error(error);

    return {
      message: 'API Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');

  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  formData: FormData,
) {
  // Validate form using Zod
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;

  const amountInCents = amount * 100;

  try {
    const response = await fetch(
      `http://localhost:3000/api/invoices/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customerId,
          amount: amountInCents,
          status,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        'Failed to update invoice:',
        response.status,
        errorText,
      );

      throw new Error('Failed to update invoice');
    }
  } catch (error) {
    console.error(error);

    return {
      message: 'API Error: Failed to Update Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');

  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/invoices/${id}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        'Failed to delete invoice:',
        response.status,
        errorText,
      );

      throw new Error('Failed to Delete Invoice');
    }

    revalidatePath('/dashboard/invoices');
  } catch (error) {
    console.error('Delete invoice error:', error);

    throw new Error('Failed to Delete Invoice');
  }
}