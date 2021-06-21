// Initialize initial LeaveRecipeScreen State
const initialState: LeaveRecipeScreenState = {
    leave: false,
  };
  
  // Initialize leaveRecipeScreenReducer with initialState and Action type
  export const leaveRecipeScreenReducer = (
    state: LeaveRecipeScreenState = initialState,
    action: EmptyAction
  ) => {
    switch (action.type) {
      // When we go to Chef/Menu tab
      case "TRIGGER_LEAVE": {
        return { leave: true };
      }
      // After we've left the Recipe Screen
      case "SET_LEAVE_FALSE": {
        return { leave: false };
      }
      // Default...
      default:
        return state;
    }
  };
  