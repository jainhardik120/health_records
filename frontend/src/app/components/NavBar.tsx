'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSigner from "../state/signer";
import "../styles/navbar.css";

export default function NavBar() {
	const router = useRouter();
	const { address, connectWallet, loading, type } = useSigner();
	const headerButtonClick = async () => {
		if (type == 0) {
			router.push("/register");
		} else if (type == 1) {
			router.push("/d");
		} else if (type == 2) {
			router.push("/p");
		}
	}
	
	return (
		<div className="navbar">
			<div className='navbar-brand'>
				<a href="/">Health-Records-App</a>
			</div>
			<div className="navbar-menu">
				<button className="navbar-button" onClick={headerButtonClick} disabled={loading || type == -1}>
					{type === -1 ? "loading..." : type === 0 ? "Register" : type === 1 ? "Doctor Portal" : "Patient Home"}
				</button>
				<button className="wallet-button" onClick={connectWallet} disabled={loading || (address !== undefined && address.length > 0)}>
					{address && (<p>{`${address.substring(0, 5)}....${address.substring(address.length - 3)}`}</p>)}
					{!address && "Connect Wallet"}
				</button>
			</div>
		</div>
	)
}