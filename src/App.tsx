import React from 'react';
import { ChainId, DAppProvider } from "@usedapp/core";
import { Box, Button, Container } from "@material-ui/core";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID // required
    }
  }
};

const web3Modal = new Web3Modal({
  network: "rinkeby" || "mainnet" || "hardhat", // optional
  cacheProvider: true, // optional
  providerOptions // required
});

function App() {

  const connectWallet = async () => {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
  }

  return (
    <DAppProvider config={{
      supportedChains: [ChainId.Rinkeby, ChainId.Mainnet, ChainId.Hardhat],
      notifications: {
        expirationPeriod: 1000,
        checkInterval: 1000
      }
    }}>
      <Container maxWidth="md">
        <Box>
          <Button onClick={() => connectWallet()} variant="contained" color="primary">Connect</Button>
        </Box>
      </Container>
    </DAppProvider>
  )
}

export default App