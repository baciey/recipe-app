import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RecipeDetailsScreen } from "../modules/recipes/screens/RecipeDetailsScreen/RecipeDetailsScreen";
import { RecipesListScreen } from "../modules/recipes/screens/RecipesListScreen/RecipesListScreen";
import { RootStackParamList, SCREENS } from "./navigation.types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREENS.RecipesList}
        component={RecipesListScreen}
        options={{ title: "Recipes" }}
      />
      <Stack.Screen
        name={SCREENS.RecipeDetails}
        component={RecipeDetailsScreen}
        options={{ title: "Recipe Details" }}
      />
    </Stack.Navigator>
  );
}
