import "core-js/stable";
import "regenerator-runtime/runtime";
import "../sass/main.scss";

const recipeContainer = document.querySelector(".recipe") as HTMLDivElement;

function timeout(s: number) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
}
