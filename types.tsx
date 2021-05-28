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