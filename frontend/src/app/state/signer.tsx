'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { JsonRpcSigner, BrowserProvider, Contract } from "ethers";
import Web3Modal from "web3modal";
import HealthRecords from "../../artifacts/contracts/HealthRecords.sol/HealthRecords.json";

type SignerContextType = {
	signer?: JsonRpcSigner;
	address?: string;
	loading: boolean;
	type : number;
	connectWallet: () => Promise<void>;
	contract : Contract;
}

const SignerContext = createContext<SignerContextType>({} as any);

const useSigner = () => useContext(SignerContext);

export const SignerProvider = ({ children }: { children: ReactNode }) => {
	const [signer, setSigner] = useState<JsonRpcSigner>();
	const [address, setAddress] = useState<string>();
	const [loading, setLoading] = useState(false);
	const [type, setType] = useState(-1);
	const contract = new Contract("0x6F9C43aC61E24A040303Fb755199b9F6F1FAF054", HealthRecords.abi, signer);
	
	useEffect(() => {
		const getType = async () => {
			try {
				const response = await fetch(`/api/auth/${address}`);
				if (!response.ok) {
					setType(0);
					return;
				}
				const data = await response.json();
				const userType = data.isNew ? 0 : data.type;
				setType(userType);
			} catch (error) {
				console.error('Error fetching user type:', error);
			}
		};
		if (address !== undefined && address.length > 0) {
			getType();
		}
	}, [address]);



	useEffect(() => {
		const web3modal = new Web3Modal();
		if (web3modal.cachedProvider) connectWallet();
		window.ethereum.on("accountsChanged", connectWallet);
	}, []);



	const connectWallet = async () => {
		setLoading(true);
		try {
			const web3modal = new Web3Modal({ cacheProvider: true });
			const instance = await web3modal.connect();
			const provider = new BrowserProvider(instance);
			const signer = await provider.getSigner();
			const address = await signer.getAddress();
			setSigner(signer);
			setAddress(address);
		} catch (e) {
			console.log(e);
		}
		setLoading(false);
	};
	const contextValue = { signer, address, loading, connectWallet, type, contract };


	return (
		<SignerContext.Provider value={contextValue}>
			{children}
		</SignerContext.Provider>
	);
}

export default useSigner;