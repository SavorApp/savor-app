// Initialize initial EnableSwipe State
const initialState: EnableSwipeState = {
    enable: true,
  };
  
  // Initialize EnableScrollReducer with initialState and Action type
  export const enableSwipeReducer = (
    state: EnableSwipeState = initialState,
    action: EmptyAction
  ) => {
    switch (action.type) {
      // Enable swiping on recipe card
      case "ENABLE_SWIPE": {
        return { enable: true };
      }

      // Disable swiping on recipe card
      case "DISABLE_SWIPE": {
        return { enable: false };
      }
      // Default...
      default:
        return state;
    }
  };
  