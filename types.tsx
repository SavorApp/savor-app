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
};

export type BottomTabParamList = {
  Chef: undefined;
  Menu: undefined;
  SavoredList: undefined;
};

export type LoggedOutParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  AboutUsScreen: undefined;
};
  
export type LoggedInParamList = {
  ChefScreen: undefined;
  AboutUsScreen: undefined;
  LoginScreen: undefined;
  DeleteAccountScreen: undefined;
};

export type MenuStackParamList = {
  MenuScreen: undefined;
  BurgerScreen: undefined;
};

export type SavoredListParamList = {
  SavoredListScreen: undefined;
  RecipeScreen: {recipeId: string};
}

/*
 _________________________
 Redux Store Objects
 _________________________
*/

// Core RootState interface
export interface RootState {
  userState: UserState
}

// Core User type
export type User = {
  id: number,
  username: string,
  image_url: string
}

// Core UserState interface
export interface UserState {
  user: User,
  isLoggedIn: Boolean
}

// Core User action
export type UserAction = {type: string, payload: User}

// Core Recipe type
export type Recipe = {
  id: number,
  sourceUrl: string,
  image: string | undefined,
  imageType: string | undefined,
  title: string,
  diets: never[] | string[],
  cuisines: string[],
  dishTypes: string[],
  vegetarian: Boolean,
  vegan: Boolean,
  glutenFree: Boolean,
  dairyFree: Boolean,
  veryHealthy: Boolean,
  cheap: Boolean,
  veryPopular: Boolean,
  sustainable: Boolean,
  aggregateLikes: number,
  spoonacularScore: number,
  healthScore: number,
  pricePerServing: number,
  readyInMinutes: number,
  servings: number,
}

// Core RecipeState interface
export interface RecipeState {
  recipe: Recipe
}

// Core Recipe action
export type RecipeAction = {type: string, payload: Recipe}

// Core RecipeState interface
export interface RecipeListState {
  recipeList: Recipe[]
}

// Core Recipe action
export type RecipeListAction = {type: string, payload: Recipe[]}

/*
 _________________________
 Other Application Objects
 _________________________
*/

// InputUser for when users log in
export type InputUser = {
  username: string,
  password: string
}