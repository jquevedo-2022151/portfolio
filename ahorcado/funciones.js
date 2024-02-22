const words = ["manzana","pollo", "merienda", "camino", "estrella", "mar"].map(word => word.toUpperCase());
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = [];
let attemptsLeft = 7;

const wordElement = document.querySelector(".word");
const letterButtons = document.querySelectorAll(".letter");

letterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const letter = button.textContent;
        button.disabled = true;
        if (selectedWord.includes(letter)) {
            for (let i = 0; i < selectedWord.length; i++) {
                if (selectedWord[i] === letter) {
                    guessedWord[i] = letter;
                }
            }
            wordElement.textContent = guessedWord.join(" ");
            if (!guessedWord.includes("_")) {
                endGame("¡Ganaste!");
            }
        } else {
            attemptsLeft--;
            updateHangman();
            if (attemptsLeft === 0) {
                endGame("¡Perdiste! La palabra era: " + selectedWord);
            }
        }
    });
});

function updateHangman() {
    const parts = ["head", "body", "left-arm", "right-arm", "left-leg", "right-leg", "dead"];
    for (let i = 0; i < parts.length; i++) {
        const partElement = document.querySelector("." + parts[i]);
        if (i < 7 - attemptsLeft) {
            partElement.style.backgroundColor = "#333";
        } else {
            partElement.style.backgroundColor = "transparent";
        }
    }
}

function endGame(message) {
    letterButtons.forEach((button) => {
        button.disabled = true;
    });
    wordElement.textContent = selectedWord;
    alert(message);
}

// Iniciar el juego
for (let i = 0; i < selectedWord.length; i++) {
    guessedWord.push("_");
}
wordElement.textContent = guessedWord.join(" ");