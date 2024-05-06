'use client'

import { useRouter } from "next/navigation";
import useSigner from "../state/signer";
import "../styles/navbar.css";
import Link from "next/link";

export default function NavBar() {
	const router = useRouter();
	const { address, connectWallet, loading, type } = useSigner();
	const headerButtonClick = async () => {
		if (type == 0) {
			router.push("/register");
		} else if (type === 1 || type === 2) {
			router.push("/dashboard");
		}
	}

	return (
		<>
			<div className="navbar">
				<div className='navbar-brand'>
					<Link href="/">Health Records App</Link>
				</div>
				<div className="navbar-menu">
					<Link href="/dashboard/requests" className="text-white">Pending Requests</Link>
					<button className="navbar-button" onClick={headerButtonClick} disabled={loading || type == -1}>
						{type === -1 ? "Loading..." : type === 0 ? "Register" : "Dashboard"}
					</button>
					<button className="navbar-button" onClick={connectWallet} disabled={loading || (address !== undefined && address.length > 0)}>
						{address && (<p>{`${address.substring(0, 20)}....${address.substring(address.length - 3)}`}</p>)}
						{!address && "Connect Wallet"}
					</button>
				</div>
			</div>
		</>
	)
}