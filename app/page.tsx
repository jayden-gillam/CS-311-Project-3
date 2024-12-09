import { neon } from '@neondatabase/serverless';

// Vercel has updated so that I can't just create a postgressql database so I am using Neon and I am working on a modified
// version of the boilerplate provided 

export default function Page() {
  async function create(formData: FormData) {
    'use server';
    const sql = neon(`${process.env.DATABASE_URL}`);
    const comment = formData.get('comment');
    await sql('INSERT INTO comments (comment) VALUES ($1)', [comment]);
  }

  return (
    <form action={create}>
      <input type="text" placeholder="write a comment" name="comment" />
      <button type="submit">Submit</button>
    </form>
  );
}