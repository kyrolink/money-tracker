import { createContext, useEffect, useReducer } from "react";

import AppReducer from "../reducers/AppReducer";

import { loadData, saveData } from "../services/storage";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(
    AppReducer,
    loadData()
  );

  useEffect(() => {
    saveData(state);
  }, [state]);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}