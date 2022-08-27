import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import {send} from "../../contract/wonderland";
import {approve} from "../../contract/wonderland";
import { txnApproved } from "../../redux/store/approved/reducer";
import { isApproved } from "../../redux/store/approved/action";
import { connect } from "react-redux";
import { tokenSelected } from "../../redux/store/token/reducer";
import { useForm } from "../../hooks/useForm";

const mapStateToProps = (state) => {
  return {
    approved: txnApproved(state),
    token: tokenSelected(state),
  };
};

const Tx = ({ approved, token }) => {
  const [errorMsg, setErrorMsg] = useState("ERROR");
  const [ethAmount, setEthAmount] = useState("");
  const [txInit, setTxInit] = useState(false);
  const [txHash, setTxHash] = useState(undefined);
  const [txConfirmed, setTxConfirmed] = useState(false);
  const { address } = useAccount();
  const {recipient, amount} = useForm();

  const tx = async (approved) => {
    const ethAmount = amount;
    if (!approved) {
      setTxInit(true);
      approve( recipient, ethAmount, token)
        .then(async (txn) => {
          setTxHash(txn.hash);
          console.log("txn =>", txn);
          //setLoader(true) should go somewhere here....

          // Getting completed transaction info with .wait()
          const txnInfo = await txn.wait();

          if (txnInfo.confirmations == 1) {
            setTxConfirmed(true);
            isApproved();
          }
        })
        .catch((e) => {
          //error handler and reverted tx
          setTxInit(false);
          setTxHash(undefined);
          setTxConfirmed(false);

          if (e.error) {
            setErrorMsg(e.error.message);
            toast.error(e.error.message);
          } else {
            setErrorMsg(e.message);
            toast.error(e.message);
            //styles can be added to toast
            //i.e: toast.error(e.message, { theme: 'dark', position: "bottom-center", autoClose: 5000, closeOnClick: true, pauseOnHover: true, });
          }
        });
    } else {
      setTxInit(true);
      send(address, recipient, ethAmount)
        .then(async (txn) => {
          setTxHash(txn.hash);
          console.log("txn =>", txn);
          //setLoader(true) should go somewhere here....

          // Getting completed transaction info with .wait()
          const txnInfo = await txn.wait();

          if (txnInfo.confirmations == 1) {
            setTxConfirmed(true);
            isApproved();
          }
        })
        .catch((e) => {
          //error handler and reverted tx
          setTxInit(false);
          setTxHash(undefined);
          setTxConfirmed(false);

          if (e.error) {
            setErrorMsg(e.error.message);
            toast.error(e.error.message);
          } else {
            setErrorMsg(e.message);
            toast.error(e.message);
            //styles can be added to toast
            //i.e: toast.error(e.message, { theme: 'dark', position: "bottom-center", autoClose: 5000, closeOnClick: true, pauseOnHover: true, });
          }
        });
    }
  };

  const startTx = async () => {
    await tx();
  };

  return (
    <>
      {errorMsg && <ToastContainer />}

      {!txConfirmed ? (
        !txInit ? (
          <>
            <div>
              <button className="tx" onClick={startTx}>
                {!approved ? "approve" : "send"}
              </button>
            </div>
          </>
        ) : txHash !== undefined ? (
          <>
            {/* remember to remove the rinkeby from the link when deploying to production */}
            <p>
              Transaction is being processed. You can view your transaction
              <a
                href={"https://rinkeby.etherscan.io/tx/" + txHash}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
            </p>
          </>
        ) : (
          <>
            <p>Confirm transaction in your wallet to proceed.</p>
          </>
        )
      ) : (
        <>
          <p>Congratulations.</p>
        </>
      )}
    </>
  );
};

export default connect(mapStateToProps, { isApproved })(Tx);
