/*
        ----------- BUttons    ---------------
*/

const uzLanguageBtn = document.getElementById("uz");
const engLanguageBtn = document.getElementById("eng");
const rusLanguageBtn = document.getElementById("rus");
const resetBtn = document.getElementById("reset");
const checkBtn = document.getElementById("Submit_btn");
const restartBtn = document.getElementById("restart");
const continueBtn = document.getElementById("continue");

/*
 --------------- INputs -----------------------
*/
const Input = document.getElementById("text");
const referanceInput = document.querySelector(".Guessing_result");
const scoreInput = document.getElementById("score");
const resultBox = document.querySelector(".result");
const opportunityInput = document.getElementById("opportunity");
const heroText = document.querySelector(".hero");
const scoreText = document.querySelector(".score_text");
const restartComponent = document.querySelector(".restart");
const restartCard = document.querySelector(".restart_card");
const opportunityText = document.getElementById("opportunity_text");
const tipText = document.querySelector(".tips");
const bodyComponent = document.querySelector("body");
/////////////// Musics ///////////////

const lossMusic = new Audio("../music/08. Lost a Life.mp3");
const winMusic = new Audio("../music/06. Level Complete.mp3");
let opportunityNum = 10;
let scoreNum = 0;
let randomNum;

////////////// Create Random Number ////////////
function createRandomNum() {
  randomNum = Math.trunc(Math.random() * 20) + 1;
}
createRandomNum();
console.log(randomNum);

/////////////////////////////////////

resetBtn.addEventListener("click", () => {
  // createRandomNum();
  // referanceInput.textContent = "Start guessing...";
  // console.log(randomNum);
  // Input.value = "";
  // opportunityNum = 10;
  // scoreNum = 0;
  // scoreInput.textContent = `${scoreNum}`;
  // opportunityInput.textContent = `${opportunityNum}`;
  // resultBox.innerHTML = "?";
  restartGame();
});

checkBtn.addEventListener("click", () => {
  checkNum();
});
function checkNum() {
  Input.disabled = true;
  let inputValue = Number(Input.value);
  if (!inputValue) {
    alert("Son kiriting");
  } else {
    if (opportunityNum > 0) {
      if (randomNum > inputValue) {
        lossMusic.addEventListener("canplaythrough", () => {
          Input.disabled = false;
        });
        lossMusic.play();
        lossMusic.addEventListener("playing", () => {
          Input.disabled = true;
        });
        lossMusic.addEventListener("ended", () => {
          Input.disabled = false;
        });
        opportunityNum--;
        opportunityInput.textContent = `${opportunityNum}`;
        if (heroText.textContent.includes("Mening")) {
          referanceInput.textContent = "Ancha kichkina";
        } else if (heroText.textContent.includes("Guess")) {
          referanceInput.textContent = "Too small";
        } else {
          referanceInput.textContent = "Слишком маленький";
        }
      } else if (randomNum < inputValue) {
        lossMusic.addEventListener("canplaythrough", () => {
          Input.disabled = false;
        });
        lossMusic.play();
        lossMusic.addEventListener("playing", () => {
          Input.disabled = true;
        });
        lossMusic.addEventListener("ended", () => {
          Input.disabled = false;
        });
        opportunityNum--;
        opportunityInput.textContent = `${opportunityNum}`;
        if (heroText.textContent.includes("Mening")) {
          referanceInput.textContent = "Ancha Katta";
        } else if (heroText.textContent.includes("Guess")) {
          referanceInput.textContent = "Too big";
        } else {
          referanceInput.textContent = "Слишком большой";
        }
      } else if (randomNum === inputValue) {
        opportunityNum--;
        opportunityInput.textContent = `${opportunityNum}`;
        scoreNum++;
        scoreInput.textContent = `${scoreNum}`;
        resultBox.innerHTML = randomNum;
        winMusic.play();
        Input.blur();
        bodyComponent.style.overflowY = "hidden";
        if (heroText.textContent.includes("Mening")) {
          referanceInput.textContent = "Siz topdingiz";
        } else if (heroText.textContent.includes("Guess")) {
          referanceInput.textContent = "You found it";
        } else {
          referanceInput.textContent = "Ты нашел это";
        }
        restartCard.classList.remove("hide");
        restartComponent.classList.remove("hide");
        return;
      }
    } else {
      alert("Sizda imkoniyat qolmadi");
    }
  }
  Input.value = "";
}

restartBtn.addEventListener("click", () => {
  restartGame();
});

/////////////////// Restart function ////////////////
function restartGame() {
  createRandomNum();
  if (heroText.textContent.includes("Mening")) {
    referanceInput.textContent = "Topishni boshlang...";
  } else if (heroText.textContent.includes("Guess")) {
    referanceInput.textContent = "Start guessing...";
  } else {
    referanceInput.textContent = "Начни гадать...";
  }
  console.log(randomNum);
  Input.value = "";
  opportunityNum = 10;
  scoreNum = 0;
  scoreInput.textContent = `${scoreNum}`;
  opportunityInput.textContent = `${opportunityNum}`;
  restartComponent.classList.add("hide");
  restartCard.classList.add("hide");
  resultBox.innerHTML = "?";
  bodyComponent.style.overflowY = "visible";
}

//////////////// Change Languages ///////////////

function changeLanguage(value) {
  if (value === "uzb") {
    heroText.innerHTML = "Mening raqamimni toping";
    tipText.textContent = "(1 va 20 Orasidan)";
    referanceInput.innerHTML = "Topishni boshlang...";
    scoreText.innerHTML = `Natija:`;
    opportunityText.innerHTML = `: Imkoniyat qoldi`;
    checkBtn.textContent = "Tekshirish!";
    Input.value = "";
  } else if (value === "eng") {
    tipText.textContent = "(Between 1 and 20)";
    heroText.innerHTML = "Guess My Number!";
    referanceInput.innerHTML = "Start guessing...";
    scoreText.innerHTML = `Score:`;
    opportunityText.innerHTML = `: Opportunity left`;
    checkBtn.textContent = "Check!";
    Input.value = "";
  } else {
    tipText.textContent = "(Между 1 и 20)";
    heroText.innerHTML = "Найди мой номер!";
    referanceInput.innerHTML = "Начни искать...";
    scoreText.innerHTML = `Счет:`;
    opportunityText.innerHTML = `: Возможность осталась`;
    checkBtn.textContent = "проверять!";
    Input.value = "";
  }
}

uzLanguageBtn.addEventListener("click", () => {
  changeLanguage("uzb");
  let langValue = "uzb";
});
engLanguageBtn.addEventListener("click", () => {
  changeLanguage("eng");
  let langValue = "eng";
});
rusLanguageBtn.addEventListener("click", () => {
  changeLanguage("rus");
});

continueBtn.addEventListener("click", () => {
  bodyComponent.style.overflowY = "visible";
  if (opportunityNum > 0) {
    createRandomNum();
    console.log(randomNum);
    Input.value = "";
    restartComponent.classList.add("hide");
    restartCard.classList.add("hide");
    resultBox.innerHTML = "?";
    if (heroText.textContent.includes("Mening")) {
      referanceInput.textContent = "Topishni boshlang...";
    } else if (heroText.textContent.includes("Guess")) {
      referanceInput.textContent = "Start guessing...";
    } else {
      referanceInput.textContent = "Начни гадать...";
    }
  } else {
    alert("Sizda imkoniyat qolmadi va O'yin qaytadan boshlanadi");
    restartGame();
  }
});

// function showReferance(langValue = "rus", inputValue) {
//   if (randomNum > inputValue) {
//     if (langValue === "eng") {
//       referanceInput.textContent = "Too small";
//     } else if (langValue === "uzb") {
//       referanceInput.textContent = "Ancha kichkina";
//     } else {
//       referanceInput.textContent = "Слишком маленький";
//     }
//   } else if (randomNum < inputValue) {
//     if (langValue === "eng") {
//       referanceInput.textContent = "Too big";
//     } else if (langValue === "uzb") {
//       referanceInput.textContent = "Ancha katta";
//     } else {
//       referanceInput.textContent = "Слишком большой";
//     }
//   }
// }
