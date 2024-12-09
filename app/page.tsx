import { neon } from '@neondatabase/serverless';

// Vercel has updated its Storage system so that I can't just create a postgressql database so I am using Neon and I am working on a modified
// version of the boilerplate provided.
// I have used previous lecture slides and videos, Neon docs and ChatGPT extensively in this project to help me create this project and database

export default function Page() {
  async function addIngredient(formData: FormData) {
    'use server';
    const sql = neon(`${process.env.DATABASE_URL}`);

    // used vercel docs to figure this out
    const name = formData.get('name') as string;
    const tag = formData.get('tag') as string;

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

  async function addMethod(formData: FormData) {
    'use server';
    const sql = neon(`${process.env.DATABASE_URL}`);
 
    const methodName = formData.get('method_name') as string;

    await sql`INSERT INTO methods (name) VALUES (${methodName})`;

  }

  return (
    <div>
      <h1>Add a New Ingredient and Cooking Method</h1>

      <form action={addIngredient}>
        <h2>Add ingredient</h2>
        <input type="text" placeholder="Ingredient Name" name="ingredient_name" required />
        <input type="text" placeholder="Tag for Ingredient" name="ingredient_tag" required />
        <button type="submit">Add Ingredient</button>
      </form>

      <form action={addMethod}>
        <h2>Add cooking method e.g. "Boil"</h2>
        <input type="text" placeholder="Method Name" name="method_name" required />
        <button type="submit">Add Cooking Method</button>
      </form>
    </div>
  );
}