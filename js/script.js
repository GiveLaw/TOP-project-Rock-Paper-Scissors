const rpsNodeList = document.querySelectorAll('.rps-list > button');
rpsNodeList.forEach((btn) => {
			btn.addEventListener('click', () => {
			  demo(btn.textContent);
			} )
	      } );

const msg = document.querySelector('#result');

let gameCount = 0;

let computerCount = 0;
let userCount = 0;

// ---------------------------------------------------------
// This function 'runs' all rhe code; returns nothing
function demo(input) {
  if (gameCount < 0 || gameCount > 5) {
    msg.textContent = 'Hey!, we have a probleme here; please, say it to the stupid who code this ···';
    return;
  }
  if (gameCount === 0) {
    msg.textContent = 'Please, select One: ';
  }

  let [message, winner] = getWinner(input);
  msg.textContent = message;

  if (winner) {
    (winner === 'Computer') ? computerCount++ :
    (winner === 'User') ? userCount++ :
    msg.textContent += '${an error with the winner}';
  }
  else {
    msg.textContent += `\nNo Winners(-_-)`
  }
  gameCount++;

  if (gameCount === 5) {
    msg.textContent = `
Computer: ${computerCount}
You: ${userCount}
    `;
    if (computerCount === userCount) {
      msg.textContent += `\nTied!`;
    }
    else if (computerCount > userCount) {
      msg.textContent += `YOU LOSE`;
    }
    else {
      msg.textContent += `YOU WIN`;
    }

    gameCount = 0;
    computerCount = 0;
    userCount = 0;
  }
}

// ---------------------------------------------------------
// This function just return a random number between 0 and 2
function getComputerChoiceNumber() {
  return Math.floor(Math.random() * 3);
}

// ---------------------------------------------------------
// This function plays a round of a game; return the 'index' of the winner
function play(computerChoiceNum, userChoiceNum) {
  console.log('--------------------- function - play');
  if (computerChoiceNum < 0 || userChoiceNum < 0 ||
      computerChoiceNum > 2 || userChoiceNum > 2) {
    return `Really?, some here looks bad:
    computer:		${computerChoiceNum}
    you:		${userChoiceNum}`;
  }
  if (computerChoiceNum === userChoiceNum) {
    return 'Tied! -> Give it your best!';
  }

  if (computerChoiceNum === 2 && userChoiceNum === 0 ||
      computerChoiceNum === 0 && userChoiceNum === 2) {
    return (computerChoiceNum < userChoiceNum) ?
	    computerChoiceNum :
	    userChoiceNum;
  } else {
   return (computerChoiceNum > userChoiceNum) ?
      	    computerChoiceNum :
	    userChoiceNum;
  }
}

// ---------------------------------------------------------
// This function works with the data; returns the messages:
function getWinner(userChoice) {
  let rpsArray = ['Rock', 'Paper', 'Scissors'];
  let wins;
  let winner;
  let loser;

  let userChoiceNumber = rpsArray.indexOf(userChoice);
  let computerChoiceNumber = getComputerChoiceNumber();
  let computerChoice = rpsArray[computerChoiceNumber];

  let playValue = play(computerChoiceNumber, userChoiceNumber);
  
  if (typeof playValue=== 'string') {
    console.log(playValue +'\n');
    return [playValue, ''];
  }

  if (playValue === computerChoiceNumber) {
    winner = computerChoice;
    loser = userChoice;
    wins = 'Computer';
  }
  else if (playValue === userChoiceNumber) {
    winner = userChoice;
    loser = computerChoice;
    wins = 'User';
  }
  let message = `${winner} beats ${loser}`
  console.log(message +'\n'+ wins);
  return [message, wins];
}

