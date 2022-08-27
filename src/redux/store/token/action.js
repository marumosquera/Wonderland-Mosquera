const switchToDai = () => {
  return {
    type: "TOKEN_DAI",
    payload: "DAI",
  };
};

const switchToUsdc = () => {
  return {
    type: "TOKEN_USDC",
    payload: "USDC",
  };
};

export { switchToDai, switchToUsdc };
