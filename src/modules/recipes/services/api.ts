import { customFetch } from "@/src/utils/customFetch";
import { Recipe, RecipeDetails } from "../types/recipe";
import { processRecipeDetailsData, processRecipesListData } from "./api.data";
import { RecipeDetailsResponse, RecipesListResponse } from "./api.types";

export const fetchRecipes = async (
  limit = 0,
  skip = 0,
  search = ""
): Promise<{ recipes: Recipe[]; total: number }> => {
  const params = `limit=${limit}&skip=${skip}${
    search ? `&search?q=${search}` : ""
  }`;
  let url: string;
  if (search.trim()) {
    url = `/recipes/search?q=${encodeURIComponent(search)}&${params}`;
  } else {
    url = `/recipes?${params}`;
  }
  const rawData = await customFetch<RecipesListResponse>(url);
  return processRecipesListData(rawData);
};

export const fetchRecipeById = async (id: string): Promise<RecipeDetails> => {
  const url = `/recipes/${id}`;
  const rawData = await customFetch<RecipeDetailsResponse>(url);
  return processRecipeDetailsData(rawData);
};
