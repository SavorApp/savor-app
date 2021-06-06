// Initialize initial EnableScroll State
const initialState: EnableScrollState = {
    enable: false,
  };
  
  // Initialize EnableScrollReducer with initialState and Action type
  export const enableScrollReducer = (
    state: EnableScrollState = initialState,
    action: EmptyAction
  ) => {
    switch (action.type) {
      // Enable scrolling on recipe card
      case "ENABLE_SCROLL": {
        return { enable: true };
      }

      // Disable scrolling on recipe card
      case "DISABLE_SCROLL": {
        return { enable: false };
      }
      // Default...
      default:
        return state;
    }
  };
  