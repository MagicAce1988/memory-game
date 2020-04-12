document.addEventListener("DOMContentLoaded", () => {
  let startTime;
  let startTimeOnFirstFlip = 0;
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
  var fails = 0;
  resultDisplay.textContent = "0";

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
      fails++;
      messageDisplay.textContent = `Sorry, try again! You failed ${
        fails === 1 ? "1 time" : `${fails} times`
      }`;
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length - parseInt(fails / 4);
    if (cardsWon.length === cardArray.length / 2) {
      const endTime = new Date();
      var res = Math.abs(endTime - startTime) / 1000;
      var minutes = Math.floor(res / 60) % 60;
      var seconds = Math.floor(res % 60);
      resultDisplay.textContent = `Congratulations! You found them all in ${
        minutes > 0 ? minutes + " minutes" : ""
      } ${seconds > 0 ? seconds + " seconds" : ""}`;
      messageDisplay.textContent = `Final score is ${
        cardsWon.length - parseInt(fails / 4)
      }. It took you ${fails + 6} tries to do it.`;
    }
  }

  function flipCard() {
    startTimeOnFirstFlip++;
    startTime = startTimeOnFirstFlip === 1 ? new Date() : startTime;
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
