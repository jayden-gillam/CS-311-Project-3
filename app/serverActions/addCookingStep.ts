'use server';

import { neon } from '@neondatabase/serverless';

export async function addCookingStep(formData: FormData) {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const template = formData.get('template') as string;

    await sql`INSERT INTO steptemplates (template) VALUES (${template})`;
  }