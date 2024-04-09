'use client'

import { useEffect, useState } from "react";
import useSigner from "../state/signer";

export default function NavBar() {

	const { address, connectWallet, loading } = useSigner();

	const [userType, setUserType] = useState(-1);

	useEffect(() => {
		const getType = async () => {
			try {
				const response = await fetch(`/api/auth/${address}`);
				if (!response.ok) {
					throw new Error('Failed to fetch user type');
				}
				const data = await response.json();
				const userType = data.isNew ? 0 : data.type;
				setUserType(userType);
			} catch (error) {
				console.error('Error fetching user type:', error);
			}
		};

		if (address !== undefined && address.length > 0) {
			getType();
		}
	}, [address]);
	return (
		<div className="fixed top-0 w-full h-16 bg-black flex content-center items-center text-white px-10">
			<div className='flex-auto h-fit'>
				<div className="w-fit h-fit">
					Health Records App
					<button className="mx-4">
						{(userType == -1) && "Loading"}
						{(userType == 0) && "Register"}
						{(userType == 1) && "Doctor Portal"}
						{(userType == 2) && "Patient Home"}
					</button>
				</div>
			</div>
			<button onClick={connectWallet} disabled={loading || (address !== undefined && address.length > 0)}>
				{address && (<p>{`${address.substring(0, 5)}....${address.substring(address.length - 3)}`}</p>)}
				{!address && "Connect Wallet"}
			</button>
		</div>
	)
}