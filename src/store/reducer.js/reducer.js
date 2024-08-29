export function reducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVE_STEP":
      return {
        ...state,
        activeStep: action.payload,
      };
    case "SET_SELECTED_LAYOUT":
      return {
        ...state,
        selectedLayout: action.payload.layoutType,
        lengthOptions: action.payload.lengthOptions,
        widthOptions: action.payload.widthOptions,
        selectedLength: action.payload.selectedLength || null,
        selectedWidth: action.payload.selectedWidth || null,
      };
    case "SET_SELECTED_LENGTH":
      return {
        ...state,
        selectedLength: action.payload,
      };
    case "SET_SELECTED_WIDTH":
      return {
        ...state,
        selectedWidth: action.payload,
      };
    default:
      return state;
  }
}
