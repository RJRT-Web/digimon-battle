const digimonContainer = document.getElementById(
  "digimonContainer",
) as HTMLElement;
const bossDigimonContainer = document.getElementById(
  "bossDigimonContainer",
) as HTMLElement;
const playerScore = document.getElementById("playerScore") as HTMLElement;
const bossScore = document.getElementById("bossScore") as HTMLElement;
const selectedCardsCount = document.getElementById(
  "selectedCardsCount",
) as HTMLElement;

interface Digimon {
  name: string;
  img: string;
  level: string;
}

async function loadDigimon() {
  try {
    const res = await fetch("https://digimon-api.vercel.app/api/digimon");
    let alldigimon = await res.json();
    console.log(alldigimon);
    if (!alldigimon) return;
    alldigimon.forEach((digimon: any) => {
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

let bossName: string;
let bossImage: string;
let bossLevel: string;

function resetBossCard(): void {
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

function resetRandomCard(): void {
  loadDigimon().then((alldigimon) => {
    // You can now use the data here

    let randomList: Digimon[] = [];
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
        activeCard(digimonCard as HTMLElement);
      });
      digimonCard.innerHTML = `
      <h3>${digimon.name}</h3>
      <img src="${digimon.img}" alt="${digimon.name}">
      <p>Rank: ${digimon.level}</p>
    `;
      document
        .getElementById("digimonContainer")
        .appendChild(digimonCard) as HTMLElement;
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

let selectedCards: string[] = [];
let cardName: string[] = [];

function activeCard(card: HTMLElement): void {
  card.classList.toggle("active");
  let cardActive = card.classList.contains("active");
  if (cardActive) {
    const level = card.getAttribute("data-level")!;
    selectedCards.push(level);
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
  if (selectedCardsCount) {
    selectedCardsCount.textContent =
      selectedCards.length > 0 ? selectedCards.join(", ") : "None selected";
  }
}

let score = (card: string): number => {
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

let bossWin = 0;
let playerWin = 0;

function fightButton(): void {
  console.log(
    `Player fight Card Level: ${selectedCards.length > 0 ? selectedCards[0] : "No card selected"}`,
  );
  console.log(`Boss fight Card Level: ${bossLevel}`);
  if (digimonContainer.firstChild === null) {
    alert("No Digimon cards available to fight!");
    playerWin = 0;
    bossWin = 0;
    selectedCards = [];
    playerScore.textContent = "0";
    bossScore.textContent = "0";
    clearRandomCards();
    clearBossCard();
    resetRandomCard();
  } else if (selectedCards.length === 0 || selectedCards.length > 1) {
    alert("Please select exactly one Digimon to fight!");
  } else {
    if (score(selectedCards[0]) < score(bossLevel)) {
      alert("You lose!");
      const cardToRemove = document.getElementById(cardName[0]);
      if (cardToRemove) cardToRemove.remove();
      bossWin++;
      bossScore.textContent = `${bossWin}`;
      clearBossCard();
      resetBossCard();
      selectedCards = [];
      cardName = [];
    } else if (score(selectedCards[0]) > score(bossLevel)) {
      alert("You win!");
      const cardToRemove = document.getElementById(cardName[0]);
      if (cardToRemove) cardToRemove.remove();
      playerWin++;
      playerScore.textContent = `${playerWin}`;
      clearBossCard();
      resetBossCard();
      selectedCards = [];
      cardName = [];
    } else {
      alert("tie!");
      const cardToRemove = document.getElementById(cardName[0]);
      if (cardToRemove) cardToRemove.remove();
      clearBossCard();
      resetBossCard();
      selectedCards = [];
      cardName = [];
    }

    if (playerWin === 3) {
      alert("Congratulations! You have defeated the Boss Digimon!");
      playerWin = 0;
      bossWin = 0;
      selectedCards = [];
      playerScore.textContent = "0";
      bossScore.textContent = "0";
      clearRandomCards();
      clearBossCard();
      resetRandomCard();
    } else if (bossWin === 3) {
      alert("The Boss Digimon has defeated you! Better luck next time!");
      playerWin = 0;
      bossWin = 0;
      selectedCards = [];
      playerScore.textContent = "0";
      bossScore.textContent = "0";
      clearRandomCards();
      clearBossCard();
      resetRandomCard();
    }
  }
}

console.log(`Player Wins: ${playerWin} - Boss Wins: ${bossWin}`);
