import { useForm, isRequired } from "../../hooks/useForm";
import Tx from "../Buttons/Tx";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { balance, allowance } from "../../contract/wonderland";
export const Form = () => {
  const initialState = { wallet: "", amount: "" };
  const validations = [
    ({ wallet }) => isRequired(wallet) || { wallet: "Address is required" },
    ({ amount }) => isRequired(amount) || { amount: "Password is required" },
  ];
  const {
    values,
    isValid,
    errors,
    touched,
    changeHandler,
    submitHandler,
    recipient,
    amount,
  } = useForm(initialState, validations);

  const [isAllowance, setIsAllowance] = useState("");
  const { address } = useAccount();
  const token = "DAI";
  useEffect(() => {
    contractInfo();
  });

  const contractInfo = async () => {
    allowance(address, recipient, token)
      .then((res) => {
        setIsAllowance(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <p> Allowance: {isAllowance}</p>

      <form onSubmit={submitHandler}>
        <label>Wallet</label>
        <input
          type="text"
          name="wallet"
          required
          value={values.wallet}
          onChange={changeHandler}
        />
        {touched.wallet && errors.wallet && (
          <p className="error">{errors.wallet}</p>
        )}
        {/* max amount should be allowance */}
        <label>Amount</label>
        <input
          type="number"
          name="amount"
          required
          value={values.amount}
          onChange={changeHandler}
        />
        {touched.amount && errors.amount && (
          <p className="error">{errors.amount}</p>
        )}

        <button disabled={!isValid} type="submit">
          save data
        </button>
        <Tx recipient={recipient} amount={amount} />
      </form>
    </>
  );
};
