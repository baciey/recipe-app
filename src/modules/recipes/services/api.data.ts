import { RecipeDetailsResponse, RecipesListResponse } from "./api.types";

export const processRecipesListData = (data: RecipesListResponse) => {
  const recipes = data.recipes.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.name,
      difficulty: recipe.difficulty,
      image: recipe.image,
      prepTimeMinutes: recipe.prepTimeMinutes,
      cookTimeMinutes: recipe.cookTimeMinutes,
    };
  });
  return {
    recipes,
    total: data.total,
  };
};

export const processRecipeDetailsData = (data: RecipeDetailsResponse) => {
  return {
    id: data.id,
    name: data.name,
    difficulty: data.difficulty,
    image: data.image,
    prepTimeMinutes: data.prepTimeMinutes,
    cookTimeMinutes: data.cookTimeMinutes,
    ingredients: data.ingredients,
    instructions: data.instructions,
  };
};
