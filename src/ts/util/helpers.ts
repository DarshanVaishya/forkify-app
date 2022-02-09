import { dataInterface } from "./interfaces";
import { TIMEOUT_SECS } from "./config";

// Can't make it void because of errors
function timeout(s: number): Promise<Response> {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
}

export async function getJSON(url: string): Promise<dataInterface> {
	try {
		const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECS)]);
		const data: dataInterface = await response.json();
		if (!response.ok) throw new Error(`${data.message} (${response.status})`);

		return data;
	} catch (err) {
		throw err;
	}
}
