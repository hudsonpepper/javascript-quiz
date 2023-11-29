console.log(window);
var newGameEl = document.querySelector("#new-game");
var resetEl = document.querySelector("#reset");

var localTest = [[["john", 38],["jill", 28]],[]]

newGameEl.addEventListener("click", function() {
  console.log("Click new game");
  document.location.href="./index.html"
});

resetEl.addEventListener("click", function(event) {
  let element = event.target;
  console.log("Click reset");
})

