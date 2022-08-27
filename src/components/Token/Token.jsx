import React from "react";
import { switchToDai, switchToUsdc } from "../../redux/store/token/action";
import {connect} from 'react-redux';
import { tokenSelected } from "../../redux/store/token/reducer";

const mapStateToProps = (state) => {
    return{
        token: tokenSelected,
    }
}
const Token = ({token, switchToDai, switchToUsdc }) => {
  return (
    <div>
      <h1> Token {token}</h1>
      <button onClick={() => switchToUsdc()}> USDC </button>
      <button onClick={() => switchToDai()}> DAI </button>
    </div>
  );
};

export default connect(mapStateToProps,{switchToUsdc, switchToDai})(Token)