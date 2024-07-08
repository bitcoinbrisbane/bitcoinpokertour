const { BIP32Factory } = require("bip32");
const { ECPairFactory } = require("ecpair");

const ecc = require("tiny-secp256k1");
const bip32 = BIP32Factory(ecc);
const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");

const ECPair = ECPairFactory(ecc);
const network = bitcoin.networks.mainnet;

const getMnemonic = () => {
	return process.env.MNEMONIC;
};

const getRegistrationAddress = (event_id, user_id) => {
	const coin = network === bitcoin.networks.testnet ? "1" : "0";
	const network_id = network === bitcoin.networks.testnet ? "44" : "84";
	//m/84'/0'/0'/0/0
	const path = `m/${network_id}'/${coin}'/${event_id}/${user_id}`;
	return getAddress(path);
};

const getAddress = path => {
	const mnemonic = getMnemonic();
	const seed = bip39.mnemonicToSeedSync(mnemonic);
	const root = bip32.fromSeed(seed, network);
	console.log("root", root);
	const child = root.derivePath(path);
	const address = bitcoin.payments.p2wpkh({
		pubkey: child.publicKey,
		network: network
	});
	return address.address;
};

module.exports = {
	getRegistrationAddress,
	getAddress
};
