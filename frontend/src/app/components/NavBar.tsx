'use client'

import { useRouter } from "next/navigation";
import useSigner from "../state/signer";
import Link from "next/link";

export default function NavBar() {
	const router = useRouter();
	const { address, connectWallet, loading, type } = useSigner();
	return (
		<>
			<div className="navbar">
				<div className='navbar-brand'>
					<Link href="/">HealthChain</Link>
				</div>
				<div className="navbar-menu">
					{type > 0 && (
						<>
							<Link href="/dashboard/requests">Pending Requests</Link>
						</>
					)}
					{type !== -1 && (
						<Link href={type === 0 ? "/register" : "/dashboard"}>{type === -1 ? "Loading..." : type === 0 ? "Register" : "Dashboard"}</Link>
					)}
					<button id="wallet-address" className="navbar-button" onClick={() => {
						(address !== undefined && address.length > 0) ? router.push(`/info/${address}`) : connectWallet();
					}} disabled={loading}>
						{address && (<p>{`${address.substring(0, 20)}....${address.substring(address.length - 3)}`}</p>)}
						{!address && "Connect Wallet"}
					</button>
				</div>
			</div>
		</>
	)
}