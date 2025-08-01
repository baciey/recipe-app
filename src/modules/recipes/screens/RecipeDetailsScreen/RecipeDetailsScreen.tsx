import { ErrorMessage } from "@/src/components/ErrorMessage/ErrorMessage";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text } from "react-native";
import { fetchRecipeById } from "../../services/api";
import { RecipeDetails } from "../../types/recipe";
import { styles } from "./RecipeDetailsScreen.styles";
import { RouteParams } from "./RecipeDetailsScreen.types";

export const RecipeDetailsScreen = () => {
  const { recipeId } = useRoute<RouteParams>().params;

  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecipeById(recipeId.toString())
      .then((data) => {
        setRecipe(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }, [recipeId]);

  if (isLoading) {
    return <ActivityIndicator style={styles.activityIndicator} />;
  } else if (error) {
    return <ErrorMessage text={error} />;
  } else if (!recipe) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <Text style={styles.name}>{recipe.name}</Text>
      <Text>
        Preparation time: {recipe.cookTimeMinutes + recipe.prepTimeMinutes}
        min
      </Text>
      <Text>Difficulty: {recipe.difficulty}</Text>

      <Text style={styles.section}>Ingredients:</Text>
      {recipe.ingredients.map((ingradient, index) => (
        <Text key={index}>• {ingradient}</Text>
      ))}

      <Text style={styles.section}>Instructions:</Text>
      {recipe.instructions.map((instruction, index) => (
        <Text key={index}>
          {index + 1}. {instruction}
        </Text>
      ))}
    </ScrollView>
  );
};
