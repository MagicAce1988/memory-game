document.addEventListener("DOMContentLoaded", () => {
  const startTime = new Date();
  const cardArray = [
    {
      name: "astronaut",
      img: "images/3.png",
    },
    {
      name: "astronaut",
      img: "images/3.png",
    },
    {
      name: "mommy",
      img: "images/4.png",
    },
    {
      name: "mommy",
      img: "images/4.png",
    },
    {
      name: "die",
      img: "images/5.png",
    },
    {
      name: "die",
      img: "images/5.png",
    },
    {
      name: "dolphin",
      img: "images/6.png",
    },
    {
      name: "dolphin",
      img: "images/6.png",
    },
    {
      name: "fighter",
      img: "images/7.png",
    },
    {
      name: "fighter",
      img: "images/7.png",
    },
    {
      name: "beatbox",
      img: "images/8.png",
    },
    {
      name: "beatbox",
      img: "images/8.png",
    },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  const messageDisplay = document.querySelector("#message");
  var cardsChosen = [];
  var cardsChosenId = [];
  var cardsWon = [];

  function checkForMatch() {
    var cards = document.querySelectorAll("img");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (cardsChosen[0] === cardsChosen[1]) {
      messageDisplay.textContent = "You found a match";
      cards[optionOneId].setAttribute("src", "images/2.png");
      cards[optionTwoId].setAttribute("src", "images/2.png");
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute("src", "images/1.png");
      cards[optionTwoId].setAttribute("src", "images/1.png");
      messageDisplay.textContent = "Sorry, try again";
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      const endTime = new Date();
      var res = Math.abs(endTime - startTime) / 1000;
      var minutes = Math.floor(res / 60) % 60;
      var seconds = Math.floor(res % 60);
      resultDisplay.textContent = `Congratulations! You found them all in ${
        minutes > 0 ? minutes + " minutes" : ""
      } ${seconds} seconds `;
    }
  }

  function flipCard() {
    if (cardsChosen.length >= 2) return;
    let cardID = this.getAttribute("data-id");
    if (cardsChosenId.includes(cardID)) return;
    cardsChosen.push(cardArray[cardID].name);
    cardsChosenId.push(cardID);
    this.setAttribute("src", cardArray[cardID].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 1000);
    }
  }

  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      let card = document.createElement("img");
      card.setAttribute("src", "images/1.png");
      card.setAttribute("data-id", i);
      card.setAttribute("draggable", false);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
  }

  createBoard();
});
