import { neon } from '@neondatabase/serverless';

export async function addIngredient(formData: FormData) {
    'use server';
    const sql = neon(`${process.env.DATABASE_URL}`);

    // used vercel docs to figure this out
    const name = formData.get('ingredient_name') as string;
    const tag = formData.get('ingredient_tag') as string;

    await sql`INSERT INTO ingredients (name) VALUES (${name})`;

    await sql`
      INSERT INTO tags (name)
      VALUES (${tag})
      ON CONFLICT (name) DO NOTHING
    `;

    await sql`
      INSERT INTO ingredienttags (ingredient_id, tag_id)
      SELECT
        (SELECT id FROM ingredients WHERE name = ${name}),
        (SELECT id FROM tags WHERE name = ${tag})
      ON CONFLICT DO NOTHING
    `;

  }