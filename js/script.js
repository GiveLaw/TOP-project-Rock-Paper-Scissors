const rpsNodeList = document.querySelectorAll('.rps-list > div');
rpsNodeList.forEach(item => {
			item.addEventListener('click', () => {
			  demo(item);
			} )
	      } );

const msg = document.querySelector('#round');
msg.textContent = 'Click on something, I don\'t have all the time in the world ···';

let gameCount = 0;
let computerCount = 0;
let userCount = 0;

const computerCountShow = document.querySelector('#computer-count');
const userCountShow = document.querySelector('#user-count');

// ---------------------------------------------------------
// This function 'runs' all rhe code; returns nothing
function demo(input) {
  msg.style.background = 'linear-gradient(90deg, #0000, #E6E6E6, #0000)';
  msg.textContent = '';
  if (gameCount < 0 || gameCount > 5) {
    msg.style.background = 'linear-gradient(90deg, #0000, #FF9E9E, #0000)';
    msg.textContent = 'Hey!, we have problems here; please let the guy who code this about it ···';
    gameCount = 0;
    msg.textContent += '\nOkay, problem solved!';
    return;
  }

  let winner = getWinner(input);

  if (winner === 'Computer') computerCount++;
  else if (winner === 'User') userCount++;

  gameCount++;

  computerCountShow.textContent = computerCount;
  userCountShow.textContent = userCount;

  if (gameCount === 5) {
    if (computerCount === userCount) {
      msg.style.background = 'linear-gradient(90deg, #0000, #E1E1FF, #E1E1FF, #0000)';
      msg.textContent = '••• Tied! - You couldn\'t do any better, could you? ···';
    }
    else if (computerCount < userCount) {
      msg.style.background = 'linear-gradient(90deg, #0000, #E1FFE1, #E1FFE1, #0000)';
      msg.textContent = '••• YOU WIN - I\'m surprised; you cheated, right? ···';
    }
    else {
      msg.style.background = 'linear-gradient(90deg, #0000, #FFE1E1, #FFE1E1, #0000)';
      msg.textContent = '••• YOU LOSE - So predictable ···';
    }

    computerCountShow.textContent = computerCount;
    userCountShow.textContent = userCount;


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
  if (computerChoiceNum < 0 || userChoiceNum < 0 ||
      computerChoiceNum > 2 || userChoiceNum > 2) {
    return `Really?, some here looks bad:
    computer:		${computerChoiceNum}
    you:		${userChoiceNum}`;
  }
  if (computerChoiceNum === userChoiceNum) {
    return 'Nobody';
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
  return 'Mmm, What the Hell? - Other Error here; Bring me the Developer!';
}

// ---------------------------------------------------------
// This function works with the data; returns the winner:
function getWinner(userClick) {
  let rpsArray = ['Rock', 'Paper', 'Scissors'];

  let computerChoiceNumber = getComputerChoiceNumber();
  let userChoiceNumber = rpsArray.indexOf(userClick.id);

  // -------------------------------------------------------
  let playValue = play(computerChoiceNumber, userChoiceNumber);
 
  let computerChoice = rpsArray[computerChoiceNumber];
  let userChoice = rpsArray[userChoiceNumber];
  let userSvg = document.querySelector(`.svg-${userChoice}`).cloneNode(true);
  let computerSvg = document.querySelector(`.svg-${computerChoice}`).cloneNode(true);
  
  if (playValue === 'Nobody') {
    msg.style.background = 'linear-gradient(90deg, #0000, #E1E1FF, #0000)';
    msg.append(computerSvg, '-', userSvg);
    console.log(msg.textContent);
    return;
  }

  let wins = '';

  if (playValue === computerChoiceNumber) {
    msg.style.background = 'linear-gradient(90deg, #0000, #FFE1E1, #0000)';
    msg.append(computerSvg, '>', userSvg);
    wins = 'Computer';
  }
  else if (playValue === userChoiceNumber) {
    msg.style.background = 'linear-gradient(90deg, #0000, #E1FFE1, #0000)';
    msg.append(computerSvg, '<', userSvg);
    wins = 'User';
  }
  else {
    msg.style.background = 'linear-gradient(90deg, #0000, #FF9E9E, #0000)';
    msg.append('Trouble is comming! ->');
    return 'This didn\'t return a valid value';
  }
  // -------------------------------------------------------

  return wins;
}

