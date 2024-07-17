const { BIP32Factory } = require("bip32");
const { ECPairFactory } = require("ecpair");

const Registration = require("../api/schemas/registration");

const ecc = require("tiny-secp256k1");
const bip32 = BIP32Factory(ecc);
const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const ECPair = ECPairFactory(ecc);
const network = bitcoin.networks.mainnet;

const getMnemonic = () => {
	return process.env.MNEMONIC;
};

const getRegistrationAddress = (event_id, user_id) => {
	const coin = network === bitcoin.networks.testnet ? "1" : "0";
	const network_id = network === bitcoin.networks.testnet ? "44" : "84";
	//m/84'/0'/0'/0/0
	const path = `m/${network_id}'/${coin}'/0'/${event_id}/${user_id}`;
	console.log("path", path);
	return getAddress(path);
};

const getAddress = path => {
	const mnemonic = getMnemonic();
	if (!bip39.validateMnemonic(mnemonic)) {
		throw new Error("Invalid Mnemonic");
	}

	const seed = bip39.mnemonicToSeedSync(mnemonic);
	const root = bip32.fromSeed(seed, network);
	// console.log("root", root);
	const child = root.derivePath(path);
	const address = bitcoin.payments.p2wpkh({
		pubkey: child.publicKey,
		network: network
	});
	return address.address;
};

const getRegistrationCount = async event_id => {
	const registrations = await Registration.find({ event_id: event_id });
	console.log(`Found ${registrations.length} registrations`);

	let count = 0;

	if (registrations.length > 0) {
		const basic_auth = Buffer.from(`${process.env.BTC_PAY_SERVER_EMAIL}:${process.env.BTC_PAY_SERVER_PASSWORD}`).toString("base64");

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Basic ${basic_auth}`
			}
		};

		for (let i = 0; i < registrations.length; i++) {
			const registration = registrations[i];

			const { data } = await axios.get(
				`${process.env.BTC_PAY_SERVER}/api/v1/stores/${process.env.BTC_PAY_SERVER_STORE_ID}/invoices/${registration.third_party_id}`,
				config
			);

			console.log(`Response for ${registration.third_party_id}: ${data.status}`);

			if (data.status === "Settled") {
				count += 1;
			}
		}
	}

	return count;
};

module.exports = {
	getRegistrationAddress,
	getRegistrationCount,
	getAddress
};
