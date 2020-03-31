// hide cards when user enters page
document.getElementById('output').style.visibility = "hidden";

document.getElementById('lbsInput').addEventListener('input', function (e) {
	
	// show user answer
	document.getElementById('output').style.visibility = "visible";

	let pounds = e.target.value;
	console.log("Pounds: " + pounds);

	// pounds to grams
	document.getElementById('gramsOutput').innerHTML = pounds/0.0022046;

	// pounds to kilograms
	document.getElementById('kgOutput').innerHTML = pounds/2.2046;

	// pounds to ounces
	document.getElementById('ozOutput').innerHTML = pounds*16;
});