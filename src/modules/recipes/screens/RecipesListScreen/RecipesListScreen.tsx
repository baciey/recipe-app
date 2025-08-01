import { ErrorMessage } from "@/src/components/ErrorMessage/ErrorMessage";
import { NavigationProp, SCREENS } from "@/src/navigation/navigation.types";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchRecipes } from "../../services/api";
import { Recipe } from "../../types/recipe";
import { styles } from "./RecipesListScreen.styles";

const FETCH_LIMIT = 10;
const DEBOUNCE_MS = 500;

export const RecipesListScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allLoaded, setAllLoaded] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [isScrollActivated, setIsScrollActivated] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(true);

  const fetchAndSetRecipes = (reset: boolean = false) => {
    if (isLoading) return;

    const currentSkip = reset ? 0 : skip;

    setIsLoading(true);
    fetchRecipes(FETCH_LIMIT, currentSkip, search)
      .then((data) => {
        setRecipes((prev) =>
          reset ? data.recipes : [...prev, ...data.recipes]
        );
        setSkip(currentSkip + FETCH_LIMIT);
        const newLength = (reset ? 0 : recipes.length) + data.recipes.length;
        setAllLoaded(newLength >= data.total);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setSkip(0);
    setAllLoaded(false);
    setIsLoading(false);
    setIsTyping(true);

    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  useEffect(() => {
    if (!isTyping) {
      fetchAndSetRecipes(true);
    }
  }, [isTyping]);

  const handleOnEndReached = () => {
    if (!isLoading && !allLoaded && isScrollActivated) {
      fetchAndSetRecipes();
    }
  };

  const handleOnRefresh = () => {
    setError(null);
    setSearch("");
    setSkip(0);
    fetchAndSetRecipes(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search..."
        style={styles.searchInput}
      />
      <ErrorMessage text={error} />
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContentContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(SCREENS.RecipeDetails, { recipeId: item.id })
            }
            style={styles.card}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.name}</Text>
              <Text>⏱️ {item.cookTimeMinutes + item.prepTimeMinutes} min</Text>
              <Text>⚙️ {item.difficulty}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          isLoading ? <ActivityIndicator style={styles.listFooter} /> : null
        }
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.1}
        onRefresh={handleOnRefresh}
        refreshing={isLoading}
        onScroll={() => {
          if (!isScrollActivated) {
            setIsScrollActivated(true);
          }
        }}
      />
    </View>
  );
};
