export type Recipe = {
  id: number;
  name: string;
  image: string;
  cookTimeMinutes: number;
  prepTimeMinutes: number;
  difficulty: "Easy" | "Medium" | "Hard";
};

export type RecipeDetails = Recipe & {
  ingredients: string[];
  instructions: string[];
};
