const initialState = {
  token: "DAI",
};

export default (state = initialState, action) => {
  if (action.type === "TOKEN_DAI") {
    return {
      ...state,
      token: "DAI",
    };
  }

  if (action.type === "TOKEN_USDC") {
    return {
      ...state,
      token: "USDC",
    };
  }

  return state;
};

export const tokenSelected = (state) => {
    return state.tokenReducer.token;
};
