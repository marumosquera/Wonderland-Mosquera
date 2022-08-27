import React from "react";
import './Home.css'
import { useAccount } from "wagmi";
import { Form } from "../../components/Form/Form";
import Token from "../../components/Token/Token";

const Home = () => {
const {address} = useAccount();

  return (
   <div className="home">
    {address
      ? <> 
      <Token/>
      <Form/> 
      </>
      : <> <h1 className='lg:text-6xl text-center'>Please connect your wallet</h1> </>

    }
   </div>

  );
};

export default Home;
