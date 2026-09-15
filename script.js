//google said this would fix a problem that kept poping up
//this pretty much says hey wait until 
//the html is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {


	//these are my variables
	let searchBox = document.getElementById("search-box");
	let backButton = document.getElementById("backBtn");
	let nextButton = document.getElementById("nextBtn");
	let saveButton = document.getElementById("saveBtn");
	let returnButton = document.getElementById("returnBtn");
	let restartButton = document.getElementById("restartBtn");
	let searchBtn = document.getElementById("searchBtn");
	
	let myTeam = [];
	let currentPokemon = null;
	let allRecords = [];
	let currentIndex = 0;
	let pokedexApp = document.getElementById("pokedexApp");
	
	//this is the event for my pokedex app button.
	//it means once you click on the pokedex button
	//it will replace the homescreen with the pokedex
	pokedexApp.addEventListener("click",function(){
		document.getElementById("homeScreen").style.display = "none";
		document.getElementById("rotomPhone").style.display = "block";
		
	});
	
	
	// this is my search button
	searchBtn.addEventListener("click", function () {
		loadRecords();
	});
	
	// Clicking this will show you the next pokemon in the pokedex
	nextButton.addEventListener("click", function () {
		if (allRecords.length === 0) return;
		
		currentIndex++;
		if (currentIndex >= allRecords.length) {
			currentIndex = 0;
		}
		showCurrentPokemon();
	});
	
	// This is the event for the back button
	backButton.addEventListener("click", function () {
		if (allRecords.length === 0) return;
		
		currentIndex--;
		if (currentIndex < 0) {
			currentIndex = allRecords.length - 1;
		}
		showCurrentPokemon();
	});
	
	// This is the button that allows you to save your pokemon team. 
	// I want to try to change it into a heart
	saveButton.addEventListener("click", function () {
		if (currentPokemon) {
			myTeam.push(currentPokemon);
			displayTeam();
		}
	});
	

	
	returnButton.addEventListener("click",function(){
		document.getElementById("rotomPhone").style.display = "none";
		document.getElementById("homeScreen").style.display = "block";
	
	});
	// this is what displays in my pokemon cards.
	function showCurrentPokemon() {
		if (allRecords.length === 0) return;
		//getting the current pokemon
		let p = allRecords[currentIndex];
		currentPokemon = p;
		
		// Pokémon image
		document.getElementById("pokeImg").src = p.image;
		
		
		
		document.querySelector(".poke-header").innerHTML = `
		<h2>${p.name}</h2>
		<p>ID: ${p.id}</p>
		<p>Type: ${p.type}</p>
		<p>Ability: ${p.ability}</p>
		<p>${p.classfication}</p>
		`;
		
		
		document.querySelector(".poke-stats").innerHTML = `
		<div>HP: ${p.hp}</div>
		<div>Attack: ${p.attack}</div>
		<div>Defense: ${p.defense}</div>
		<div>Sp Atk: ${p.sp_attack}</div>
		<div>Sp Def: ${p.sp_defense}</div>
		<div>Speed: ${p.speed}</div>
		`;
		
		document.querySelector(".poke-details").innerHTML = `
		<p>Capture Rate: ${p.capture_rate}</p>
		<p>Height: ${p.height_m || "N/A"} m</p>
		<p>Weight: ${p.weight_kg || "N/A"} kg</p>
		<p>Generation: ${p.generation}</p>
		<p>Legendary: ${p.is_legendary === "1" ? "Yes" : "No"}</p>
		<p>Male %: ${p.percentage_male}</p>
		<p>XP Growth: ${p.experience_growth}</p>
		`;
	}
	
	// DISPLAY TEAM
	function displayTeam() {
		let box = document.getElementById("teamDisplay");
		box.innerHTML = "";
		
		for (let i = 0; i < myTeam.length; i++) {
			let p = document.createElement("p");
			p.textContent = myTeam[i].name + " | Type: " + myTeam[i].type;
			box.appendChild(p);
		}
	}
	
	// LOAD RECORDS
	async function loadRecords() {
		let response = await fetch(
			"https://student-data-api.alana-duke25.workers.dev/api/v1/datasets/pokedex/records?search=" 
			+ searchBox.value
		);
		
		let data = await response.json();
		allRecords = data.records;
		
		if (allRecords.length > 0) {
			currentIndex = 0;
			showCurrentPokemon();
		}
	}
	const cursorMon = document.getElementById("cursorMon");

document.addEventListener("mousemove", (event) => {
  cursorMon.style.left = event.clientX + 10 + "px"; 
  cursorMon.style.top = event.clientY + 10 + "px";
});

	
});   

