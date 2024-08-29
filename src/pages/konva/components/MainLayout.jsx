import React, { useReducer } from "react";
import Navbar from "../../../components/Navbar";
import SummaryPanel from "../../../components/SummaryPanel";
import { reducer } from "../../../store/reducer.js/reducer";
import SelectionPanel from "./SelectionPanel";

const initialState = {
  activeStep: 0,
  selectedLayout: null,
  lengthOptions: [],
  widthOptions: [],
  selectedLength: null,
  selectedWidth: null,
};

export default function MainLayout() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    activeStep,
    selectedLayout,
    lengthOptions,
    widthOptions,
    selectedLength,
    selectedWidth,
  } = state;

  console.log("WHOLE APP STATE : ", state);
  const handleNextStep = () => {
    dispatch({ type: "SET_ACTIVE_STEP", payload: state.activeStep + 1 });
  };

  const handlePreviousStep = () => {
    if (state.activeStep > 0) {
      dispatch({ type: "SET_ACTIVE_STEP", payload: state.activeStep - 1 });
    }
  };

  const handleLayoutSelect = (layout) => {
    dispatch({
      type: "SET_SELECTED_LAYOUT",
      payload: {
        ...layout,
        // selectedLength: state.selectedLength,
        // selectedWidth: state.selectedWidth,
      },
    });
  };

  const handleLengthSelect = (length) => {
    dispatch({ type: "SET_SELECTED_LENGTH", payload: length });
  };

  const handleWidthSelect = (width) => {
    dispatch({ type: "SET_SELECTED_WIDTH", payload: width });
  };

  return (
    <main>
      <Navbar />
      <section className="h-[95vh] flex relative z-10">
        <SummaryPanel activeStep={activeStep} />
        <SelectionPanel
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          activeStep={activeStep}
          onLayoutSelect={handleLayoutSelect}
          onLengthSelect={handleLengthSelect}
          onWidthSelect={handleWidthSelect}
          selectedLength={selectedLength}
          selectedWidth={selectedWidth}
          selectedLayout={selectedLayout}
        />
      </section>
    </main>
  );
}
