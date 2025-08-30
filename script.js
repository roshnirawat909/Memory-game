//Memory Game

let values = ["🍅", "🥕", "🍇", "🍉", "🍋", "🍟", "🍔", "🍕", "🍿", "🍫"];
let copyValues = [...values, ...values, ...values];
copyValues.sort(() => 0.5 - Math.random());

const box = document.querySelector(".box");


copyValues.forEach((elem, index) => {
  box.innerHTML += `
    <div class="card" data-value="${elem}">
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back">${elem}</div>
      </div>
    </div>
  `;
});

const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = document.querySelector(".score");
let count = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {

  if (firstCard.dataset.value === secondCard.dataset.value) {
    count += 2;
    score.innerHTML = `score: ${count}`;
    setTimeout(() => {
      firstCard.remove();
      secondCard.remove();
      resetBoard();
    }, 600);
  } else {

    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener('click', flipCard));
