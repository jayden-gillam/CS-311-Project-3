'use client';

import { useState } from 'react';
import { addIngredient } from './serverActions/addIngredient';
import { addMethod } from './serverActions/addMethod';
import { addCookingStep } from './serverActions/addCookingStep';
import { generateCookingStep } from './serverActions/generateCookingStep';
import { saveRecipe } from './serverActions/saveRecipe';

export default function Page() {
  const [currentRecipe, setCurrentRecipe] = useState<string[]>([]);
  const [stepCount, setStepCount] = useState(1);
  const [recipeName, setRecipeName] = useState('');


  async function handleGenerateCookingStep() {
    setCurrentRecipe([]);

    for (let i = 0; i < stepCount; i++) {
      const step = await generateCookingStep();
      if (step) {
        setCurrentRecipe((prevSteps) => [...prevSteps, step]);
      }
    }
  }

  async function handleSaveRecipe() {
    if (!recipeName || currentRecipe.length === 0) {
      return;
    }

    await saveRecipe(recipeName, currentRecipe);
  }

  // Used ChatGPT to generate base tailwind styling
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-black text-center mb-8">Cooking Recipe Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form className="bg-white p-6 shadow-md rounded-md" action={addIngredient}>
          <h2 className="text-lg font-semibold text-black mb-4">Add Ingredient</h2>
          <input
            type="text"
            placeholder="Ingredient Name"
            name="ingredient_name"
            className="w-full p-2 border border-gray-300 rounded-md text-black mb-4"
            required
          />
          <input
            type="text"
            placeholder="Tag for Ingredient"
            name="ingredient_tag"
            className="w-full p-2 border border-gray-300 rounded-md text-black mb-4"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Ingredient
          </button>
        </form>

        <form className="bg-white p-6 shadow-md rounded-md" action={addMethod}>
          <h2 className="text-lg font-semibold text-black mb-4">Add Cooking Method</h2>
          <input
            type="text"
            placeholder="Method Name"
            name="method_name"
            className="w-full p-2 border border-gray-300 rounded-md text-black mb-4"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Cooking Method
          </button>
        </form>

        <form className="bg-white p-6 shadow-md rounded-md" action={addCookingStep}>
          <h2 className="text-lg font-semibold text-black mb-4">Add Cooking Step</h2>
          <input
            type="text"
            placeholder="Use '*' for ingredients and '^' for methods"
            name="template"
            className="w-full p-2 border border-gray-300 rounded-md text-black mb-4"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Cooking Step
          </button>
        </form>
      </div>

      <div className="mt-8 bg-white p-6 shadow-md rounded-md">
        <h2 className="text-lg font-semibold text-black mb-4">Generate Recipe</h2>
        <div className="mb-4">
          <label className="block text-sm text-black font-medium mb-2">Number of Steps:</label>
          <input
            type="number"
            min="2"
            max="5"
            value={stepCount}
            onChange={(e) => setStepCount(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <button
          onClick={handleGenerateCookingStep}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Generate Recipe
        </button>

        {currentRecipe.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-black mb-2">Generated Recipe:</h3>
            <ol className="list-decimal list-inside bg-gray-50 p-4 rounded-md shadow-inner">
              {currentRecipe.map((step, index) => (
                <li key={index} className="mb-2 text-black">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {currentRecipe.length > 0 && (
          <div className="mt-8 bg-white p-6 shadow-md rounded-md">
            <h2 className="text-lg font-semibold text-black mb-4">Save Recipe</h2>
            <input
              type="text"
              placeholder="Enter Recipe Name"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-black mb-4"
            />
            <button
              onClick={handleSaveRecipe}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save Recipe
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
