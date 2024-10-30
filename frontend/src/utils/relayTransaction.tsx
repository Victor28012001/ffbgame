// import { ethers } from 'ethers';
const { ethers } = require('ethers');
import axios from 'axios';

declare global {
  interface Window {
    ethereum: any;
  }
}

// Define a more specific type for the message parameter
interface MessageData {
  data: any; // You can specify a more precise type based on your needs
}

async function signMessages(message: MessageData) {
  try {
    const { address, signature } = await signMessage({ data: message });
    const finalPayload = await createMessage(message, "dappAddress", address, signature);
    const realSigner = await ethers.utils.verifyMessage(finalPayload.message, finalPayload.signature);
    
    console.log(`Real signer is: ${realSigner}`);
    console.log("Final payload", finalPayload);
    
    const txhash = await sendTransaction(finalPayload);
    return txhash;
  } catch (err: any) {
    console.log(err.message);
  }
}

async function signMessage(message: MessageData): Promise<{ address: string; signature: string }> {
  try {
    console.log(JSON.stringify(message));
    if (!window?.ethereum) {
      throw new Error("No crypto wallet found. Please install it.");
    }

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(JSON.stringify(message));
    const address = await signer.getAddress();
    return { address, signature };
  } catch (err: any) {
    console.log(err.message);
    throw err;
  }
}

async function createMessage(new_data: any, target: string, signer: string, signature: string) {
  console.log(target);
  
  // Stringify the message object
  const messageString = JSON.stringify({ data: new_data });
  
  // Construct the final JSON object
  const finalObject = {
    message: messageString,
    signer: signer,
    signature: signature
  };
  
  return finalObject;
}

async function sendTransaction(data: any) {
  console.log("Forwarding transaction to relayer...");
  try {
    const response = await axios.post('http://localhost:3000/transactions', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Transaction successful:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error sending transaction:', error.response ? error.response.data : error.message);
    throw error; // Optionally rethrow the error for further handling
  }
}

export default signMessages;
