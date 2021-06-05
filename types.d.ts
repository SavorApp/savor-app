/*
 _________________________
 Stack Navigator Params
 _________________________
*/

type RootStackParamList = {
  Root: undefined;
  SignupScreen: undefined;
  AboutUsScreen: undefined;
  DeleteAccountScreen: undefined;
  MenuScreen: undefined;
  BurgerScreen: undefined;
  ProtectedBurgerScreen: undefined;
};

type BottomTabParamList = {
  Chef: undefined;
  Menu: undefined;
  SavoredList: undefined;
};

type ChefStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  ChefScreen: undefined;
  AboutUsScreen: undefined;
  DeleteAccountScreen: undefined;
};

type MenuStackParamList = {
  MenuScreen: undefined;
  BurgerScreen: undefined;
  ProtectedBurgerScreen: undefined;
};

type SavoredListStackParamList = {
  SavoredListScreen: undefined;
  RecipeScreen: { recipeId: number };
};

type RecipeScreenStackParamList = {
  SavoredListScreen: undefined;
  RecipeScreen: { recipeId: number };
};


/*
 _________________________
 Redux Store Objects
 _________________________
*/

// Core RootState interface
interface RootState {
  userState: UserState;
  recipeState: RecipeState;
  userRecipeListState: UserRecipeListState;
  filtersState: FiltersState;
  reloadRecipesState: ReloadRecipesState;
}

// Core User type
type User = {
  id: string | undefined;
  username: string | null | undefined;
  image_url: string | null | undefined;
};

// Core UserState interface
interface UserState {
  user: User;
  isLoggedIn: Boolean;
}

// Core User action
type UserAction = { type: string; payload: User };

// Core RecipeState interface
interface RecipeState {
  recipe: Recipe;
}

// Core Recipe action
type RecipeAction = { type: string; payload: Recipe };

// Core UserRecipe type
type UserRecipe = {
  id: number;
  title: string;
  cuisine: string;
  dishType: string;
  vegetarian: Boolean;
  vegan: Boolean;
  glutenFree: Boolean;
  dairyFree: Boolean;
  readyInMinutes: number;
  servings: number;
  ingredients: string[];
  isSavored: Boolean;
};

// Core UserRecipeListState interface
interface UserRecipeListState {
  userRecipeList: UserRecipe[];
}

// Core UserRecipeList action
type UserRecipeListAction = {
  type: string;
  payload: UserRecipeListState | UserRecipe[] | UserRecipe;
};

// Core Filters type
type Filters = {
  smartFilter: Boolean;
  dishType: string;
  cuisine: string;
  vegetarian: Boolean;
  vegan: Boolean;
  glutenFree: Boolean;
  dairyFree: Boolean;
  readyInMinutes: number;
  servings: number;
};

// Core FiltersState interface
interface FiltersState {
  filters: Filters;
}

// Core Filters action
type FiltersAction = { type: string; payload: FiltersState | Filters };

// Core ReloadRecipesState interface
interface ReloadRecipesState {
  reload: Boolean;
}

// Empty action for resets
type EmptyAction = {
  type: string;
};

/*
 _____________________________
 Components Property Objects
 _____________________________
*/

type RecipeCardParamList = {
  id: number;
  rcp: Recipe;
};

type SwipeButtonsParamList = {
  handleOnPressLeft: () => void;
  handleOnPressRight: () => void;
};

type RecipeCardStackParamList = {
  randRecipes: Recipe[];
  filtersState: FiltersState;
};

/*
 _________________________
 Other Application Objects
 _________________________
*/

// InputUser for when users log in
type InputUser = {
  email: string;
  password: string;
};

// Spoonacular Recipe type
type Recipe = {
  id: number;
  sourceUrl: string;
  image: string | undefined;
  imageType: string | undefined;
  title: string;
  diets: never[] | string[];
  cuisines: string[];
  dishTypes: string[];
  vegetarian: Boolean;
  vegan: Boolean;
  glutenFree: Boolean;
  dairyFree: Boolean;
  veryHealthy: Boolean;
  cheap: Boolean;
  veryPopular: Boolean;
  sustainable: Boolean;
  aggregateLikes: number;
  spoonacularScore: number;
  healthScore: number;
  pricePerServing: number;
  readyInMinutes: number;
  servings: number;
  ingredients: string[];
  smartFilterScore: number;
  extendedIngredients?: Ingredient[];
};

// Spoonacular Ingredient type
type Ingredient = {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalString: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: never[] | string[];
  metaInformation: never[] | string[];
  measures: {
    us: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
    metric: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
  };
};

// Recipe Screen Info type
type RecipeScreenInfo = {
  title: string;
  instructions: string;
  summary: string;
  ingredients: string[];
  veryHealthy: boolean;
  vegan: boolean;
  vegetarian: boolean;
  dairyFree: boolean;
  healthScore: number;
  prepTime: number;
  diets: string[];
  recipeId?: number;
};
