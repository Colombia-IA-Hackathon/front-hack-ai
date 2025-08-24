// Detecta si hay una wallet de Ethereum instalada (por ejemplo, MetaMask)
export function isWalletInstalled(): boolean {
	if (typeof window !== "undefined" && (window as any).ethereum) {
		return true;
	}
	return false;
}
