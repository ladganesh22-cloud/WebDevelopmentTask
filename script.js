// change the box color when user click on boxes
// start boxes color change
const boxRed = document.getElementById('red');
const boxGreen = document.getElementById('green');
const boxBlue = document.getElementById('blue');
const boxYellow = document.getElementById('yellow');

boxRed.addEventListener('click', () => {
  boxRed.style.backgroundColor = 'red';
});

boxGreen.addEventListener('click', () => {
  boxGreen.style.backgroundColor = 'green';
});

boxBlue.addEventListener('click', () => {
  boxBlue.style.backgroundColor = 'blue';
});

boxYellow.addEventListener('click', () => {
  boxYellow.style.backgroundColor = 'yellow';
});
// end boxes color

// input form text when user click on button
// start text entered
const displayText = document.getElementById("greeting-text");
const greetButton = document.getElementById("greet-button");
greetButton.addEventListener("click", () => {
  const inputText = document.getElementById("input-1");
  const inputTextValue = inputText.value;
  displayText.append(", " + inputTextValue);
});
// end text entered
