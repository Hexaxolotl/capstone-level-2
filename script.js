document.addEventListener("DOMContentLoaded", () => {
	
	let searchBox = document.getElementById("search-box");
	let backButton = document.getElementById("backBtn");
	let nextButton = document.getElementById("nextBtn");
	let saveButton = document.getElementById("saveBtn");
	let restartButton = document.getElementById("restartBtn");
	let searchBtn = document.getElementById("searchBtn");
	let myTeam = [];
	let currentPokemon = null;
	let allRecords = [];
	let currentIndex = 0;
	let pokedexApp = document.getElementById("pokedexApp");
	
	
	pokedexApp.addEventListener("click",function(){
		document.getElementById("homeScreen").style.display = "none";
		document.getElementById("rotomPhone").style.display = "block";
	
	});
	
	
	// SEARCH BUTTON
	searchBtn.addEventListener("click", function () {
		loadRecords();
	});
	
	// NEXT BUTTON
	nextButton.addEventListener("click", function () {
		if (allRecords.length === 0) return;
		
		currentIndex++;
		if (currentIndex >= allRecords.length) {
			currentIndex = 0;
		}
		showCurrentPokemon();
	});
	
	// BACK BUTTON
	backButton.addEventListener("click", function () {
		if (allRecords.length === 0) return;
		
		currentIndex--;
		if (currentIndex < 0) {
			currentIndex = allRecords.length - 1;
		}
		showCurrentPokemon();
	});
	
	// SAVE BUTTON
	saveButton.addEventListener("click", function () {
		if (currentPokemon) {
			myTeam.push(currentPokemon);
			displayTeam();
		}
	});
	
	// RESTART BUTTON
	restartButton.addEventListener("click", function () {
		document.getElementById("pokeScreen").textContent = "";
		document.getElementById("pokeImg").src = "";
		allRecords = [];
		currentIndex = 0;
	});
	
	// DISPLAY CURRENT POKEMON
	function showCurrentPokemon() {
		if (allRecords.length === 0) return;
		
		let p = allRecords[currentIndex];
		currentPokemon = p;
		
		// Pokémon image
		document.getElementById("pokeImg").src = p.image;
		
		// Full info panel
		let info = document.getElementById("pokeInfo");
		
		info.innerHTML = `
		<h3>${p.name}</h3>
		
		<p><strong>ID:</strong> ${p.id}</p>
		<p><strong>Ability:</strong> ${p.ability}</p>
		<p><strong>Type:</strong> ${p.type}</p>
		<p><strong>Classification:</strong> ${p.classfication}</p>
		
		<h4>Stats</h4>
		<p><strong>HP:</strong> ${p.hp}</p>
		<p><strong>Attack:</strong> ${p.attack}</p>
		<p><strong>Defense:</strong> ${p.defense}</p>
		<p><strong>Sp. Attack:</strong> ${p.sp_attack}</p>
		<p><strong>Sp. Defense:</strong> ${p.sp_defense}</p>
		<p><strong>Speed:</strong> ${p.speed}</p>
		
		<h4>Details</h4>
		<p><strong>Pokedex #:</strong> ${p.pokedex_number}</p>
		<p><strong>Capture Rate:</strong> ${p.capture_rate}</p>
		<p><strong>Height (m):</strong> ${p.height_m || "N/A"}</p>
		<p><strong>Weight (kg):</strong> ${p.weight_kg || "N/A"}</p>
		<p><strong>Generation:</strong> ${p.generation}</p>
		<p><strong>Legendary:</strong> ${p.is_legendary === "1" ? "Yes" : "No"}</p>
		<p><strong>Male %:</strong> ${p.percentage_male}</p>
		<p><strong>XP Growth:</strong> ${p.experience_growth}</p>
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
	
});   // THIS closes DOMContentLoaded correctly

