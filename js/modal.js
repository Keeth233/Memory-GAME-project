let modal = document.getElementById("mainModal"); //modal container
let plyAgain = document.getElementById("play-again-btn"); // play again button
let closeBtn = document.querySelector(".close"); // close button

gameDone();

//listen for Click event on Play Again
plyAgain.addEventListener("click", closePlayAgain);

//listen for Click event on Close Button
closeBtn.addEventListener("click", closeModal);

//close modal on outside click
window.addEventListener("click", clickedOutside);


//close modal on Play Again function
function closePlayAgain(){
  modal.style.display = 'none';
 window.location.reload()
}

//close modal with Close Button function
function closeModal(){
  modal.style.display = 'none';
  window.location.reload()
}

//close modal on outside Click function
function clickedOutside(event){
    if (event.target == modal){
    modal.style.display = 'none';
  }
}

//Display MODAL RATING, Moves and stop TIME
function buildStarRating(stars)
{
  let result = "";
  for(let i = 0; i < stars; i++){
    result += `<li style='display: inline'><i class="fa fa-star"> </i> </li>`
  }
  return result;
}

function gameDone() {

  let finalRating = buildStarRating(5);

  if (Number(moves) > 12 && Number(moves) < 18) {
      finalRating = buildStarRating(3);
  } else if (Number(moves) >18) {
      finalRating = buildStarRating(1);
  }


        if (matchedCards.length === icons.length) {
            document.getElementById("modalBody").innerHTML = "<p>You finished with <span style='color: #aa7ecd;font-size: 30px;'>" + (Number(moves) + 1) + "</span> moves </p> <p> in <span style='color: #02b3e4;font-size: 25px;'>" + minutes + "</span> minutes and <span style='color: #02b3e4;font-size: 25px;'>" + (Number(seconds) - 1) +"</span> seconds</p> <span> Stars : <ul style='list-style: none; padding: 0px; margin: 0px;'>" + finalRating + "</ul></span>";
            modal.style.display = 'block';
            stopTimer();
        }else {
          modal.style.display = 'none';
        }
    }
