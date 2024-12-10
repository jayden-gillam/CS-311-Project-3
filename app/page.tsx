// 'use client';

// import { useState } from 'react';
// import { addIngredient } from './serverActions/addIngredient';
// import { addMethod } from './serverActions/addMethod';
// import { addCookingStep } from './serverActions/addCookingStep';
// import { generateCookingStep } from './serverActions/generateCookingStep';

// // Vercel has updated its Storage system so that I can't just create a postgressql database so I am using Neon and I am working on a modified
// // version of the boilerplate provided.
// // I have used previous lecture slides and videos, Neon docs and ChatGPT extensively in this project to help me create this project and database

// export default function Page() {
//   const [currentRecipe, setCurrentRecipe] = useState<string[]>([]);
//   const [stepCount, setStepCount] = useState(1);


//   // Used ChatGPT to debug errors
//   async function handleGenerateCookingStep() {
//     setCurrentRecipe([]);

//     for (let i = 0; i < stepCount; i++) {
//       const step = await generateCookingStep();
//       if (step) {
//         setCurrentRecipe((prevSteps) => [...prevSteps, step]);
//       }
//     }

//   }
  
//   return (
//     <div>
//       <h1>Add a New Ingredient and Cooking Method</h1>

//       <form action={addIngredient}>
//         <h2>Add ingredient</h2>
//         <input type="text" placeholder="Ingredient Name" name="ingredient_name" required />
//         <input type="text" placeholder="Tag for Ingredient" name="ingredient_tag" required />
//         <button type="submit">Add Ingredient</button>
//       </form>

//       <form action={addMethod}>
//         <h2>Add cooking method e.g. "Boil"</h2>
//         <input type="text" placeholder="Method Name" name="method_name" required />
//         <button type="submit">Add Cooking Method</button>
//       </form>

//       <form action={addCookingStep}>
//         <h2>Cooking Step (Use '*' for ingredients and '^' for methods, e.g. )</h2>
//         <input type="text" placeholder="Cooking step" name="template" required />
//         <button type="submit">Add Cooking Step</button>
//       </form>

//       <div>
//       <h2>Generate Recipe</h2>
//         <label>Number of Steps:
//           <input type="number" min="2" max="5" value={stepCount} onChange={(e) => setStepCount(Number(e.target.value))}/>
//         </label>
//         <button onClick={handleGenerateCookingStep}>Generate Recipe</button>
        
//         {currentRecipe.length > 0 && (
//         <div>
//           <h3>Generated Recipe:</h3>
//           <ol>
//             {currentRecipe.map((step, index) => (
//               <li key={index}>{step}</li>
//             ))}
//           </ol>
//         </div>
//       )}
//       </div>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { addIngredient } from './serverActions/addIngredient';
import { addMethod } from './serverActions/addMethod';
import { addCookingStep } from './serverActions/addCookingStep';
import { generateCookingStep } from './serverActions/generateCookingStep';

export default function Page() {
  const [currentRecipe, setCurrentRecipe] = useState<string[]>([]);
  const [stepCount, setStepCount] = useState(1);

  async function handleGenerateCookingStep() {
    setCurrentRecipe([]);

    for (let i = 0; i < stepCount; i++) {
      const step = await generateCookingStep();
      if (step) {
        setCurrentRecipe((prevSteps) => [...prevSteps, step]);
      }
    }
  }

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
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            required
          />
          <input
            type="text"
            placeholder="Tag for Ingredient"
            name="ingredient_tag"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
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
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
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
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
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
          <label className="block text-sm font-medium mb-2">Number of Steps:</label>
          <input
            type="number"
            min="2"
            max="5"
            value={stepCount}
            onChange={(e) => setStepCount(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
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
      </div>
    </div>
  );
}
