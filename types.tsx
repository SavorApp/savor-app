/*
 _________________________
 Stack Navigator Params
 _________________________
*/

export type RootStackParamList = {
  Root: undefined;
  SignupScreen: undefined;
  AboutUsScreen: undefined;
  DeleteAccountScreen: undefined;
  MenuScreen: undefined;
  BurgerScreen: undefined;
  ProtectedBurgerScreen: undefined;
};

export type BottomTabParamList = {
  Chef: undefined;
  Menu: undefined;
  SavoredList: undefined;
};

export type ChefStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  ChefScreen: undefined;
  AboutUsScreen: undefined;
  DeleteAccountScreen: undefined;
}

export type MenuStackParamList = {
  ChefScreen: undefined;
  MenuScreen: undefined;
  BurgerScreen: undefined;
  ProtectedBurgerScreen: undefined;
};

export type SavoredListStackParamList = {
  SavoredListScreen: undefined;
  RecipeScreen: { recipeId: number };
};

/*
 _________________________
 Redux Store Objects
 _________________________
*/

// Core RootState interface
export interface RootState {
  userState: UserState;
  recipeState: RecipeState;
  userRecipeListState: UserRecipeListState;
  filtersState: FiltersState;
}

// Core User type
export type User = {
  id: string | undefined;
  username: string | null | undefined;
  image_url: string | null | undefined;
};

// Core UserState interface
export interface UserState {
  user: User;
  isLoggedIn: Boolean;
}

// Core User action
export type UserAction = { type: string; payload: User };

// Empty User action

export type EmptyUserAction = {
  type: string;
};

// Core Recipe type
export type Recipe = {
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
};

// Core RecipeState interface
export interface RecipeState {
  recipe: Recipe;
}

// Core Recipe action
export type RecipeAction = { type: string; payload: Recipe };

// Core UserRecipe type
export type UserRecipe = {
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
export interface UserRecipeListState {
  userId: string;
  userRecipeList: UserRecipe[];
}

// Core UserRecipeList action
export type UserRecipeListAction = {
  type: string;
  payload: UserRecipeListState | UserRecipe[] | UserRecipe;
};

// Core Filters type
export type Filters = {
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
export interface FiltersState {
  userId: string;
  filters: Filters;
}

// Core Filters action
export type FiltersAction = { type: string; payload: FiltersState | Filters };

/*
 _____________________________
 Components Property Objects
 _____________________________
*/

export type RecipeCardParamList = {
  id: number;
  rcp: Recipe;
}

export type SwipeButtonsParamList = {
  handleOnPressLeft: () => void;
  handleOnPressRight: () => void;
};

export type RecipeCardStackParamList = {
  randRecipes: Recipe[];
  filtersState: FiltersState;
}

/*
 _________________________
 Other Application Objects
 _________________________
*/

// InputUser for when users log in
export type InputUser = {
  email: string;
  password: string;
};

export type Ingredient = {
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
  metaInformation: never[] | string[]
  measures: {
    us: {
      amount: number;
      unitShort: string;
      unitLong: string;
    },
    metric: {
      amount: number
      unitShort: string;
      unitLong: string;
    }
  }
}
