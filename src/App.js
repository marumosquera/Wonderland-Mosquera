import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//PAGES
import Home from "./pages/Home/Home";
import WonderlandMarquee from "./components/Marquee/Marquee";
import { NavBar } from "./components/NavBar/NavBar";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";

//RAINBOW KIT
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.goerli],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Wonderland DeFi",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});


function App() {
  
  return (
    <BrowserRouter>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          initialChain={chain.rinkeby}
          theme={midnightTheme()}
        >
          <div className="App">
            <NavBar />
            
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
            <WonderlandMarquee />
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </BrowserRouter>
  );
}

export { App};
