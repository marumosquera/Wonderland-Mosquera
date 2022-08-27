
import { useForm, isRequired } from "../../hooks/useForm";
import Tx from "../Buttons/Tx";

export const Form = () => {
    const initialState = {wallet: '', amount: ''};
    const validations = [
      ({wallet}) => isRequired(wallet) || {wallet: 'Address is required'},
      ({amount}) => isRequired(amount) || {amount: 'Password is required'},
   ];
    const {values, isValid, errors, touched, changeHandler, submitHandler} = useForm(initialState, validations);
   
    return (
      <form onSubmit={submitHandler}> 
        <label>Wallet</label>
        <input
          type="text"
          name="wallet"
          required
          value={values.wallet}
          onChange={changeHandler}/>
        {touched.wallet && errors.wallet && <p className="error">{errors.wallet}</p>}
        {/* max amount should be allowance */}
        <label>Amount</label>
        <input
          type="number"
          name="amount"
          required
          value={values.amount}
          onChange={changeHandler}/>
        {touched.amount && errors.amount && <p className="error">{errors.amount}</p>}
        
        <button
            disabled={!isValid}
            type="submit">
          <Tx/>
        </button>
      </form>
    );
};
