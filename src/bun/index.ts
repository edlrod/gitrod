import { BrowserWindow, Updater } from "electrobun/bun";

const DEV_SERVER_PORT = 5173;
const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}`;

// Check if Vite dev server is running for HMR
async function getAppUrl(): Promise<string> {
	const channel = await Updater.localInfo.channel();
	if (channel === "dev") {
		await fetch(DEV_SERVER_URL, { method: "HEAD" });
		console.log(`Using Vite dev server at ${DEV_SERVER_URL}`);
		return DEV_SERVER_URL;
	}
	return "views://app/index.html";
}

// Create the main application window
const url = await getAppUrl();

new BrowserWindow({
	title: "GitRod",
	url,
	frame: {
		width: 900,
		height: 700,
		x: 200,
		y: 200,
	},
});

console.log("App started!");
