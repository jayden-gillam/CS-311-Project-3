import { neon } from '@neondatabase/serverless';

// Vercel has updated its Storage system so that I can't just create a postgressql database so I am using Neon and I am working on a modified
// version of the boilerplate provided.
// I have used previous lecture slides and videos, Neon docs and ChatGPT extensively in this project to help me create this project and database

export default function Page() {
  async function create(formData: FormData) {
    'use server';
    const sql = neon(`${process.env.DATABASE_URL}`);

    const name = formData.get('name') as string;
    const tag = formData.get('tag') as string;

    await sql`INSERT INTO ingredients (name) VALUES (${name})`;

    await sql`
      INSERT INTO tags (name)
      VALUES (${tag})
      ON CONFLICT (name) DO NOTHING
    `;

    await sql`
      INSERT INTO ingredient_tags (ingredient_id, tag_id)
      SELECT
        (SELECT id FROM ingredients WHERE name = ${name}),
        (SELECT id FROM tags WHERE name = ${tag})
      ON CONFLICT DO NOTHING
    `;
  }

  return (
    <form action={create}>
      <h1>Add a New Ingredient</h1>
      <input type="text" placeholder="Ingredient Name" name="name" required />
      <input type="text" placeholder="Tag" name="tag" required />
      <button type="submit">Add Ingredient</button>
    </form>
  );
}