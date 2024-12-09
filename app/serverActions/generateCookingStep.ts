import { neon } from '@neondatabase/serverless';
//used ChatGPT to understand, fix and implement this function

export async function generateCookingStep() {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const randomStep = await sql`SELECT template FROM steptemplates ORDER BY RANDOM() LIMIT 1`;
    const stepTemplate = randomStep[0]?.template;

    if (!stepTemplate) {
      return "No cooking steps available.";
    }

    const ingredientResult = await sql`SELECT name FROM ingredients ORDER BY RANDOM() LIMIT 1`;
    const ingredient = ingredientResult[0]?.name; // used ChatGPT to help me fix this

    const methodResult = await sql`SELECT name FROM methods ORDER BY RANDOM() LIMIT 1`;
    const method = methodResult[0]?.name // used ChatGPT to help me fix this

    return stepTemplate.replace(/\*/g, ingredient).replace(/\^/g, method);
}