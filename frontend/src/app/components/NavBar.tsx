'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSigner from "../state/signer";
import "../styles/navbar.css";

export default function NavBar() {

	const router = useRouter();

	const { address, connectWallet, loading } = useSigner();

	const [userType, setUserType] = useState(0);

	useEffect(() => {
		const getType = async () => {
			try {
				const response = await fetch(`/api/auth/${address}`);
				if (!response.ok) {
					setUserType(0);
					return;
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

	const headerButtonClick = async () => {
		if (userType == 0) {
			router.push("/register");
		} else if (userType == 1) {
			router.push("/d");
		} else if (userType == 2) {
			router.push("/p");
		}
	}
	
	return (
		<div className="navbar">
			<div className='navbar-brand'>
				<a href="/">Health-Records-App</a>
			</div>
			<div className="navbar-menu">
				<button className="navbar-button" onClick={headerButtonClick} disabled={loading || userType == -1}>
					{userType === -1 ? "loading..." : userType === 0 ? "Register" : userType === 1 ? "Doctor Portal" : "Patient Home"}
				</button>
				<button className="wallet-button" onClick={connectWallet} disabled={loading || (address !== undefined && address.length > 0)}>
					{address && (<p>{`${address.substring(0, 5)}....${address.substring(address.length - 3)}`}</p>)}
					{!address && "Connect Wallet"}
				</button>
			</div>
		</div>
	)
}