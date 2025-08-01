import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum SCREENS {
  RecipesList = "RecipesList",
  RecipeDetails = "RecipeDetails",
}

export type RootStackParamList = {
  [SCREENS.RecipesList]: undefined;
  [SCREENS.RecipeDetails]: { recipeId: number };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
