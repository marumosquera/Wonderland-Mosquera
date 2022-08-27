const initialState = {
    approved: false,
  };
  
  export default (state = initialState, action) => {
    if (action.type === "APPROVED") {
      return {
        ...state,
        approved: true,
      };
    }
  
    return state;
  };
  
  export const txnApproved = (state) => {
      return state.approvedReducer.approved;
  };
  