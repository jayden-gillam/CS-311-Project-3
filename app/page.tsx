'use client';

import { useState } from 'react';
import { addIngredient } from './serverActions/addIngredient';
import { addMethod } from './serverActions/addMethod';
import { addCookingStep } from './serverActions/addCookingStep';
import { generateCookingStep } from './serverActions/generateCookingStep';

// Vercel has updated its Storage system so that I can't just create a postgressql database so I am using Neon and I am working on a modified
// version of the boilerplate provided.
// I have used previous lecture slides and videos, Neon docs and ChatGPT extensively in this project to help me create this project and database

export default function Page() {
  const [currentRecipe, setCurrentRecipe] = useState<string | null>(null);
  const [stepCount, setStepCount] = useState<number>(1);


  // Seperated server functions in order to fix error in vercel deployment and added function below
  async function handleGenerateCookingStep() {
    const step = await generateCookingStep();
    setCurrentRecipe(step);
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
        <h2>Cooking Step (Use '*' for ingredients and '^' for methods, e.g. )</h2>
        <input type="text" placeholder="Cooking step" name="template" required />
        <button type="submit">Add Cooking Step</button>
      </form>

      <div>
      <h2>Generate Recipe</h2>
        <label>
          Number of Steps:
          <input
            type="number"
            min="2"
            max="5"
            value={stepCount}
            onChange={(e) => setStepCount(Number(e.target.value))}
          />
        </label>
        <button onClick={handleGenerateCookingStep}>Generate Recipe</button>
        {/* <button onClick={handleGenerateCookingStep}>Generate Recipe</button>
        {currentRecipe && (
          <div>
            <h3>Generated Cooking Step:</h3>
            <p>{currentRecipe}</p>
          </div>
        )} */}
      </div>
    </div>
  );
}