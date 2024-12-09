import { neon } from '@neondatabase/serverless';

// Vercel has updated its Storage system so that I can't just create a postgressql database so I am using Neon and I am working on a modified
// version of the boilerplate provided.
// I have used previous lecture slides and videos, Neon docs and ChatGPT extensively in this project to help me create this project and database

export default function Page() {

  var currentRecipe = "";

  async function addIngredient(formData: FormData) {
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

  async function addMethod(formData: FormData) {
    'use server';
    const sql = neon(`${process.env.DATABASE_URL}`);
 
    const methodName = formData.get('method_name') as string;

    await sql`INSERT INTO methods (name) VALUES (${methodName})`;

  }

  async function addCookingStep(formData: FormData) {
    'use server';
    const sql = neon(`${process.env.DATABASE_URL}`);

    const template = formData.get('template') as string;

    await sql`INSERT INTO steptemplates (template) VALUES (${template})`;
  }

  async function generateCookingStep() {
    'use server';
    const sql = neon(`${process.env.DATABASE_URL}`);

    const randomStep = await sql`SELECT template FROM cooking_steps ORDER BY RANDOM() LIMIT 1`;
    const stepTemplate = randomStep[0].template;

    if (!stepTemplate) {
      currentRecipe = "No cooking steps available.";
    }

    const ingredientResult = await sql`SELECT name FROM ingredients ORDER BY RANDOM() LIMIT 1`;
    const ingredient = ingredientResult[0].name;

    const methodResult = await sql`SELECT name FROM methods ORDER BY RANDOM() LIMIT 1`;
    const method = methodResult[0].name;

    const completedStep = stepTemplate.replace(/\*/g, ingredient).replace(/\^/g, method);

    currentRecipe = completedStep;
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

      <form action={addCookingStep}>
        <h2>Cooking Step</h2>
        <input type="text" placeholder="Write a cooking step template. Use '*' for ingredients and '^' for methods." name="template" required />
        <button type="submit">Add Cooking Step</button>
      </form>

      <form action={generateCookingStep}>
        <button type="submit">Generate Random Cooking Step</button>
      </form>

      <div>{currentRecipe}</div>

    </div>
  );
}