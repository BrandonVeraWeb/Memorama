class Memorama {
  constructor() {
    this.totalCards = [];
    this.cardsNumber = 0;
    this.cardsVerify = [];
    this.errors = 0;
    this.difficulty = "";
    this.imageCorrects = [];
    this.cardsAdd = [];
    this.attemptsNumbers = 0;
    this.$containerGeneral = document.querySelector(".container-general");
    this.$containerCards = document.querySelector(".container-cards");
    this.$blockScreen = document.querySelector(".block-screen");
    this.$message = document.querySelector("h2.message");
    this.$errorContainer = document.createElement("div");
    //Call events
    this.evenListeners();
  }
  evenListeners() {
    window.addEventListener("DOMContentLoaded", () => {
      this.selectDifficulty();
      this.loadingScreen();
    });
  }

  selectDifficulty() {
    const message = prompt(
      "Select difficulty: Easy, Intermediate o Hard. If you do not select you start in intermediate"
    );
    if (!message) {
      this.attemptsNumbers = 5;
      this.levelDifficulty = "Intermediate";
    } else {
      if (message.toLowerCase() === "easy") {
        this.attemptsNumbers = 7;
        this.levelDifficulty = "Easy";
      } else if ((message.toLocaleLowerCase = "intermediate")) {
        this.attemptsNumbers = 5;
        this.levelDifficulty = "Intermediate";
      } else if ((message.toLocaleLowerCase = "hard")) {
        this.attemptsNumbers = 3;
        this.levelDifficulty = "Hard";
      }
    }
  }

  async loadingScreen() {
    const response = await fetch("../memo.json");
    const data = await response.json();
    this.totalCards = data;
    if (this.totalCards.length > 0) {
      this.totalCards.sort(order);
      function order(a, b) {
        return Math.random() - 0.5;
      }
    }
    this.cardsNumber = this.totalCards.length;
    let html = "";
    this.totalCards.forEach((card) => {
      html += `<div class="card">
      <img class="card-img" src=${card.src} alt="Memorama Img">      
      </div>`;
    });
    this.$containerCards.innerHTML = html;
    this.startGame();
    this.containerError();
  }
  startGame() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        this.clickCard(e);
      });
    });
  }
  clickCard(e) {
    this.switchCard(e);
    let sourceImage = e.target.childNodes[1].attributes[1].value;
    this.cardsVerify.push(sourceImage);
    let card = e.target;
    this.cardsAdd.unshift(card);
    this.compareCards();
  }
  switchCard(e) {
    e.target.style.backgroundImage = "none";
    e.target.style.backgroundColor = "white";
    e.target.childNodes[1].style.display = "block";
  }

  cardFixed(cardArrGood) {
    cardArrGood.forEach((card) => {
      card.classList.add("correct");
      this.imageCorrects.push(card);
      this.gameWin();
    });
  }

  reverseCards(cardArrWrong) {
    cardArrWrong.forEach((card) => {
      setTimeout(() => {
        card.style.backgroundImage = "url(../img/cover.jpg)";
        card.childNodes[1].style.display = "none";
      }, 1000);
    });
  }

  compareCards() {
    if (this.cardsVerify.length == 2) {
      if (this.cardsVerify[0] === this.cardsVerify[1]) {
        this.cardFixed(this.cardsAdd);
      } else {
        this.reverseCards(this.cardsAdd);
        this.errors++;
        this.incrementError();
        this.lostGame();
      }
      this.cardsVerify.splice(0);
      this.cardsAdd.splice(0);
    }
  }
  gameWin() {
    if (this.imageCorrects.length == this.cardsNumber) {
      setTimeout(() => {
        this.$blockScreen.style.display = "block";
        this.$message.innerText = "You Win";
      }, 1000);
      setTimeout(() => {
        location.reload();
      }, 4000);
    }
  }
  lostGame() {
    if (this.errors === 5) {
      setTimeout(() => {
        this.$blockScreen.style.display = "block";
      }, 1000);
      setTimeout(() => {
        location.reload();
      }, 4000);
    }
  }
  incrementError() {
    this.$errorContainer.innerText = `Errores: ${this.errors}`;
  }
  containerError() {
    this.$errorContainer.classList.add("error");
    this.incrementError();
    this.$containerGeneral.appendChild(this.$errorContainer);
  }
}
new Memorama();
