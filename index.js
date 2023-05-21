import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";
import { abi, contractAddress } from "./constants.js";
const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdrawButton");

connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;
const connect = async () => {
  if (typeof window.ethereum != "undefined") {
    await window.ethereum.reqeust({ method: "eth_requestAccount" });
  } else {
    connectButton.innerText = "Please install metamask";
  }
};
const fund = async (ethAmount) => {
  const ethAmount = document.getElementById("ethAmount").value;
  console.log(`Funding with with ${ethAmount}`);
  if (typeof window.ethereum != "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSinger();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      await listenForTransactionMine(transactionResponse, provider);
      console.log("Done");
    } catch (error) {
      console.log(error);
    }
  }
};
const listenForTransactionMine = (transactionResponse, provider) => {
  console.log(`Mining ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, () => {
      console.log(
        `Completed with ${transactionReceitpt.confirmations} confirmations`
      );
    });
    resolve();
  });
};

const getBalance = async () => {
  if (typeof window.ethereum != "undefined") {
    const provider = new ethers.provider.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    console.log(ethers.utils.formatEthers(balance));
  }
};

const withdraw = async () => {
  if (typeof window.ethereum != "undefined") {
    console.log("withdrawing");
    const provider = new ethers.provider.Web3Provider(window.ethereum);
    const signer = provider.getSinger()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {
      const transactionResponse = await contract.withdraw()
      await listenForTransactionMine(transactionResponse, provider )
      
    } catch (error) {
      console.error(error);
    }
    const balance = await provider.getBalance(contractAddress);
    console.log(ethers.utils.formatEthers(balance));
  } 
};
