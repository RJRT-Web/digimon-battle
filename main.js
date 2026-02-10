var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var digimonContainer = document.getElementById("digimonContainer");
var bossDigimonContainer = document.getElementById("bossDigimonContainer");
var playerScore = document.getElementById("playerScore");
var bossScore = document.getElementById("bossScore");
var selectedCardsCount = document.getElementById("selectedCardsCount");
var overlay = document.getElementById("overlay");
var popupH2 = document.getElementById("popupH2");
var popupP = document.getElementById("popupP");
function openPopup() {
    overlay.style.display = "flex";
    popupH2.textContent = "Rules";
    popupP.textContent =
        "Select a Digimon card to play use. The highest rank Digimon wins the round. The first to win 3 rounds wins the game.Digimon Rank are Mega > Ultimate > Champion > Rookie > In Training";
}
function closePopup() {
    overlay.style.display = "none";
}
function loadDigimon() {
    return __awaiter(this, void 0, void 0, function () {
        var res, alldigimon, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://digimon-api.vercel.app/api/digimon")];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    alldigimon = _a.sent();
                    console.log(alldigimon);
                    if (!alldigimon)
                        return [2 /*return*/];
                    alldigimon.forEach(function (digimon) {
                        if (digimon.level === "Armor") {
                            digimon.level = "Champion";
                        }
                        if (digimon.level === "Fresh") {
                            digimon.level = "In Training";
                        }
                    });
                    return [2 /*return*/, alldigimon];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching Digimon data:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var bossName;
var bossImage;
var bossLevel;
function resetBossCard() {
    loadDigimon().then(function (alldigimon) {
        var randomBossIndex = Math.floor(Math.random() * alldigimon.length);
        bossName = alldigimon[randomBossIndex].name;
        bossImage = alldigimon[randomBossIndex].img;
        bossLevel = alldigimon[randomBossIndex].level;
        console.log("Random Boss Digimon:", alldigimon[randomBossIndex]);
        var digimonCardBoss = document.createElement("div");
        digimonCardBoss.classList.add("digimon-card");
        digimonCardBoss.innerHTML = "\n    <h3>".concat(bossName, "</h3>\n    <img class=\"digimon-image\" src=\"").concat(bossImage, "\" alt=\"").concat(bossName, "\">\n    <p>Rank: ").concat(bossLevel, "</p>\n  ");
        document
            .getElementById("bossDigimonContainer")
            .appendChild(digimonCardBoss);
    });
}
resetBossCard();
function resetRandomCard() {
    loadDigimon().then(function (alldigimon) {
        // You can now use the data here
        var randomList = [];
        for (var i = 0; i < 5; i++) {
            var randomIndex = Math.floor(Math.random() * alldigimon.length);
            randomList.push(alldigimon[randomIndex]);
        }
        console.log("Random Digimon List:", randomList);
        randomList.forEach(function (digimon) {
            var digimonCard = document.createElement("div");
            digimonCard.classList.add("digimon-card");
            digimonCard.setAttribute("id", digimon.name);
            digimonCard.setAttribute("data-level", digimon.level);
            digimonCard.addEventListener("click", function () {
                activeCard(digimonCard);
            });
            digimonCard.innerHTML = "\n      <h3>".concat(digimon.name, "</h3>\n      <img src=\"").concat(digimon.img, "\" alt=\"").concat(digimon.name, "\">\n      <p>Rank: ").concat(digimon.level, "</p>\n    ");
            document
                .getElementById("digimonContainer")
                .appendChild(digimonCard);
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
var selectedCards = [];
var cardName = [];
function activeCard(card) {
    card.classList.toggle("active");
    var cardActive = card.classList.contains("active");
    if (cardActive) {
        var level = card.getAttribute("data-level");
        selectedCards.push(level);
        console.log("Card is active");
        cardName.push(card.getAttribute("id"));
    }
    else {
        selectedCards = selectedCards.filter(function (c) { return c !== card.getAttribute("data-level"); });
        cardName = cardName.filter(function (c) { return c !== card.getAttribute("id"); });
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
var score = function (card) {
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
var bossWin = 0;
var playerWin = 0;
function fightButton() {
    console.log("Player fight Card Level: ".concat(selectedCards.length > 0 ? selectedCards[0] : "No card selected"));
    console.log("Boss fight Card Level: ".concat(bossLevel));
    if (digimonContainer.firstChild === null) {
        overlay.style.display = "flex";
        popupH2.textContent = "Warning!";
        popupP.textContent = "No Digimon cards available to fight!";
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
    else if (selectedCards.length === 0 || selectedCards.length > 1) {
        overlay.style.display = "flex";
        popupH2.textContent = "Warning!";
        popupP.textContent = "Please select exactly one Digimon to fight!";
    }
    else {
        if (score(selectedCards[0]) < score(bossLevel)) {
            overlay.style.display = "flex";
            popupH2.textContent = "You lose!";
            popupP.textContent = "The Boss Digimon has a higher rank!";
            var cardToRemove = document.getElementById(cardName[0]);
            if (cardToRemove)
                cardToRemove.remove();
            bossWin++;
            bossScore.textContent = "".concat(bossWin);
            clearBossCard();
            resetBossCard();
            selectedCards = [];
            cardName = [];
        }
        else if (score(selectedCards[0]) > score(bossLevel)) {
            overlay.style.display = "flex";
            popupH2.textContent = "You win!";
            popupP.textContent = "Congratulations, you defeated the Boss Digimon!";
            var cardToRemove = document.getElementById(cardName[0]);
            if (cardToRemove)
                cardToRemove.remove();
            playerWin++;
            playerScore.textContent = "".concat(playerWin);
            clearBossCard();
            resetBossCard();
            selectedCards = [];
            cardName = [];
        }
        else {
            overlay.style.display = "flex";
            popupH2.textContent = "Tie!";
            popupP.textContent = "The player and boss Digimon have the same rank!";
            var cardToRemove = document.getElementById(cardName[0]);
            if (cardToRemove)
                cardToRemove.remove();
            clearBossCard();
            resetBossCard();
            selectedCards = [];
            cardName = [];
        }
        if (playerWin === 3) {
            overlay.style.display = "flex";
            popupH2.textContent = "Congratulations!";
            popupP.textContent = "You have defeated the Boss Digimon!";
            playerWin = 0;
            bossWin = 0;
            selectedCards = [];
            playerScore.textContent = "0";
            bossScore.textContent = "0";
            clearRandomCards();
            clearBossCard();
            resetRandomCard();
        }
        else if (bossWin === 3) {
            overlay.style.display = "flex";
            popupH2.textContent = "Game Over!";
            popupP.textContent =
                "The Boss Digimon has defeated you! Better luck next time!";
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
console.log("Player Wins: ".concat(playerWin, " - Boss Wins: ").concat(bossWin));
