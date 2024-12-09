import { neon } from '@neondatabase/serverless';

export async function addMethod(formData: FormData) {
    'use server';
    const sql = neon(`${process.env.DATABASE_URL}`);
 
    const methodName = formData.get('method_name') as string;

    await sql`INSERT INTO methods (name) VALUES (${methodName})`;

  }