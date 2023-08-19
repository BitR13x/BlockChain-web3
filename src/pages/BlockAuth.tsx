import React from "react";
import { useNavigate } from "react-router-dom";
import { BLOCKNETWORK, APIHOST } from '../constants';

import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import axios from "axios";

const BlockAuth = () => {
    const navigate = useNavigate();

    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected, address } = useAccount();
    const { signMessageAsync } = useSignMessage();

    const handleAuth = async () => {
        //disconnects the web3 provider if it's already active
        if (isConnected) {
            await disconnectAsync();
        }
        // enabling the web3 provider metamask
        const { account } = await connectAsync({
            connector: new InjectedConnector(),
        });

        // chain : 1 -> eth, chain : 1337 -> testnet
        const userData = { address: account, chain: 1337 };
        // making a post request to our 'request-message' endpoint
        const { data } = await axios.post(
            `${APIHOST}/api/blockchain/request-nonce`,
            {
                headers: {
                    "content-type": "application/json",
                },
            }
        );

        const message_object = {
            message: `${window.location.hostname} wants you to sign in with your Ethereum account:\n` +
                `${address}\n` +
                '\n' +
                `'Please sign this message to confirm your identity.'\n` +
                '\n' +
                `URI: ${window.location.origin}\n` +
                'Version: 1\n' +
                `Chain ID: ${userData.chain}\n` +
                `Nonce: ${data.nonce}\n` +
                `Issued At: ${data.time}`,
        }

        let message = message_object.message
        // signing the received message via metamask
        const signature = await signMessageAsync({ message });

        await axios.post(
            `${APIHOST}/api/blockchain/authenticate`,
            {
                message,
                signature,
                address: address
            },
            {
                withCredentials: true,
                headers: {
                    "content-type": "application/json",
                }
            } // set cookie from Express server
        );

        // redirect to /user
        navigate("/user");
    };

    return (
        <div>
            <h3>Web3 Authentication</h3>
            <button onClick={() => handleAuth()}>Authenticate via MetaMask</button>
        </div>
    );
}

export default BlockAuth;