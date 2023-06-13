class Memorama {
  constructor() {
    this.totalCards = [];
    this.cardsNumber = 0;
    this.cardsVerify = [];
    this.errors = 0;
    this.difficulty = "";
    this.imageCorrects = [];
    this.cardsAdd = [];

    this.$containerGeneral = document.querySelector(".container-general");
    this.$containerCards = document.querySelector(".container-cards");
    this.$blockScreen = document.querySelector(".block-screen");
    this.$message = document.querySelector("h2.message");
    //Call events
    this.evenListeners();
  }
  evenListeners() {
    window.addEventListener("DOMContentLoaded", () => {
      this.loadingScreen();
    });
  }
  async loadingScreen() {
    const response = await fetch("../memo.json");
    const data = await response.json();
    console.log(data);
  }
}
new Memorama();
