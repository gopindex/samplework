import { createContext, useReducer } from "react";
import { intitialState, GithubReducer } from "./../reducer/GithubReducer";

const GithubContext = createContext(null);

function GithubProvider(props) {
  const [state, dispatch] = useReducer(GithubReducer, intitialState);
  return (
    <GithubContext.Provider value={[state, dispatch]}>
      {props.children}
    </GithubContext.Provider>
  );
}

export { GithubContext, GithubProvider };
