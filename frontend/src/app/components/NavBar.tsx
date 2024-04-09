'use client'

import useSigner from "../state/signer";

export default function NavBar() {

	const { address, connectWallet, loading } = useSigner();

	return (
		<div className="fixed top-0 w-full h-16 bg-black flex content-center items-center text-white px-10">
			<div className='flex-auto h-fit'>
				<div className="w-fit h-fit">
					Health Records App
				</div>
			</div>
			<button onClick={connectWallet} disabled={loading || (address !== undefined && address.length > 0)}>
				{address && (<p>{`${address.substring(0, 5)}....${address.substring(address.length - 3)}`}</p>)}
				{!address && "Connect Wallet"}
			</button>
		</div>
	)
}