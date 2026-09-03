import { mockUsers } from '@/app/lib/mock-data';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = mockUsers.find(
      (user) =>
        user.email === email &&
        user.password === password,
    );

    if (!user) {
      return Response.json(
        {
          error: 'Invalid email or password',
        },
        {
          status: 401,
        },
      );
    }

    // Don't return password
    return Response.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('Login API error:', error);

    return Response.json(
      {
        error: 'Failed to authenticate user',
      },
      {
        status: 500,
      },
    );
  }
}