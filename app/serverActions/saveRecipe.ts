'use server';

import { neon } from '@neondatabase/serverless';

export async function saveRecipe(name: string, steps: string[]) {
  const sql = neon(`${process.env.DATABASE_URL}`);

    const stepsString = steps.join("|");

    await sql`
      INSERT INTO recipes (name, steps, likes)
      VALUES (${name}, ${stepsString}, 0)
    `;
}
