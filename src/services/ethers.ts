import { ethers } from "ethers";

type Provider = ethers.Provider;

const getEthersProvider = () =>
  new ethers.JsonRpcProvider(process.env.PROVIDER_URL);

const getWalletAndConnect = async (provider: Provider) => {
  const privateKey = process.env.PRIVATE_KEY || "";
  const wallet = new ethers.Wallet(privateKey, provider);
  return wallet.connect(provider);
};

export { getWalletAndConnect, getEthersProvider };
