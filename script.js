const digimonName = document.getElementById("digimonName");
const digimonLevel = document.getElementById("digimonLevel");
const digimonImage = document.getElementById("digimonImage");
const digimonContainer = document.getElementById("digimonContainer");
const bossDigimonContainer = document.getElementById("bossDigimonContainer");
const playerScore = document.getElementById("playerScore");
const bossScore = document.getElementById("bossScore");

async function loadDigimon() {
  try {
    const res = await fetch("https://digimon-api.vercel.app/api/digimon");
    let alldigimon = await res.json();
    console.log(alldigimon);

    alldigimon.forEach((digimon) => {
      if (digimon.level === "Armor") {
        digimon.level = "Champion";
      }
      if (digimon.level === "Fresh") {
        digimon.level = "In Training";
      }
    });

    return alldigimon;
  } catch (error) {
    console.error("Error fetching Digimon data:", error);
  }
}

let bossName;
let bossImage;
let bossLevel;

function resetBossCard() {
  loadDigimon().then((alldigimon) => {
    const randomBossIndex = Math.floor(Math.random() * alldigimon.length);
    bossName = alldigimon[randomBossIndex].name;
    bossImage = alldigimon[randomBossIndex].img;
    bossLevel = alldigimon[randomBossIndex].level;
    console.log("Random Boss Digimon:", alldigimon[randomBossIndex]);
    const digimonCardBoss = document.createElement("div");
    digimonCardBoss.classList.add("digimon-card");
    digimonCardBoss.innerHTML = `
    <h3>${bossName}</h3>
    <img class="digimon-image" src="${bossImage}" alt="${bossName}">
    <p>Rank: ${bossLevel}</p>
  `;
    document
      .getElementById("bossDigimonContainer")
      .appendChild(digimonCardBoss);
  });
}
resetBossCard();

function resetRandomCard() {
  loadDigimon().then((alldigimon) => {
    // You can now use the data here

    let randomList = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * alldigimon.length);
      randomList.push(alldigimon[randomIndex]);
    }
    console.log("Random Digimon List:", randomList);

    randomList.forEach((digimon) => {
      const digimonCard = document.createElement("div");
      digimonCard.classList.add("digimon-card");
      digimonCard.setAttribute("id", digimon.name);
      digimonCard.setAttribute("data-level", digimon.level);
      digimonCard.addEventListener("click", function () {
        activeCard(digimonCard);
      });
      digimonCard.innerHTML = `
      <h3>${digimon.name}</h3>
      <img src="${digimon.img}" alt="${digimon.name}">
      <p>Rank: ${digimon.level}</p>
    `;
      document.getElementById("digimonContainer").appendChild(digimonCard);
    });
  });
}
resetRandomCard();

function clearRandomCards() {
  while (digimonContainer.firstChild) {
    digimonContainer.removeChild(digimonContainer.firstChild);
  }
}

function clearBossCard() {
  while (bossDigimonContainer.firstChild) {
    bossDigimonContainer.removeChild(bossDigimonContainer.firstChild);
  }
}

function resetGame() {
  playerWin = 0;
  bossWin = 0;
  selectedCards = [];
  playerScore.textContent = "0";
  bossScore.textContent = "0";
  clearRandomCards();
  clearBossCard();
  resetRandomCard();
  resetBossCard();
}

let selectedCards = [];
let cardName = [];

function activeCard(card) {
  card.classList.toggle("active");
  let cardActive = card.classList.contains("active");
  if (cardActive) {
    selectedCards.push(card.getAttribute("data-level"));
    console.log("Card is active");
    cardName.push(card.getAttribute("id"));
  } else {
    selectedCards = selectedCards.filter(
      (c) => c !== card.getAttribute("data-level"),
    );
    cardName = cardName.filter((c) => c !== card.getAttribute("id"));
    console.log("Card is not active");
    card.classList.remove("active");
  }
  console.log("Selected Cards:", selectedCards);

  // Update the display every time selectedCards changes
  const selectedCardsCount = document.getElementById("selectedCardsCount");
  if (selectedCardsCount) {
    selectedCardsCount.textContent =
      selectedCards.length > 0 ? selectedCards.join(", ") : "None selected";
  }
}

let score = (card) => {
  switch (card) {
    case "In Training":
      return 1;
    case "Rookie":
      return 2;
    case "Champion":
      return 3;
    case "Ultimate":
      return 4;
    case "Mega":
      return 5;
    default:
      return 0;
  }
};

const fightButton = document.getElementById("fight");

let bossWin = 0;
let playerWin = 0;

fightButton.addEventListener("click", function () {
  console.log(
    `Player fight Card Level: ${selectedCards.length > 0 ? selectedCards[0] : "No card selected"}`,
  );
  console.log(`Boss fight Card Level: ${bossLevel}`);
  if (digimonContainer.firstChild === null) {
    alert("No Digimon cards available to fight!");
    playerWin = 0;
    bossWin = 0;
    clearRandomCards();
    clearBossCard();
    resetRandomCard();
    resetBossCard();
  } else if (selectedCards.length === 0 || selectedCards.length > 1) {
    alert("Please select exactly one Digimon to fight!");
    return;
  } else {
    if (score(selectedCards[0]) < score(bossLevel)) {
      alert("You lose!");
      bossWin++;
      document.getElementById(cardName[0]).remove();
      bossScore.textContent = ` ${bossWin}`;
      clearBossCard();
      resetBossCard();
    } else if (score(selectedCards[0]) > score(bossLevel)) {
      alert("You win!");
      playerWin++;
      playerScore.textContent = `${playerWin}`;
      clearBossCard();
      resetBossCard();
      selectedCards = [];
      cardName = [];
      selectedCardsCount.textContent = "None selected";
    } else {
      alert("tie!");
      document.getElementById(cardName[0]).remove();
      clearBossCard();
      resetBossCard();
    }
  }

  console.log(`Player Wins: ${playerWin} - Boss Wins: ${bossWin}`);

  if (playerWin === 3) {
    alert("Congratulations! You have defeated the Boss Digimon!");
    playerWin = 0;
    bossWin = 0;
    clearRandomCards();
    clearBossCard();
    resetRandomCard();
  } else if (bossWin === 3) {
    alert("The Boss Digimon has defeated you! Better luck next time!");
    playerWin = 0;
    bossWin = 0;
    clearRandomCards();
    clearBossCard();
    resetRandomCard();
  }
});
