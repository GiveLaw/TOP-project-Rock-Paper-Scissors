function getComputerChoice() {
  let random =  Math.floor(Math.random() * 3) + 1;
  let choice = (random === 1) ? 'Rock' :
         (random === 2) ? 'Paper' :
         (random === 3) ? 'Scissors':
         'We have a problem here!';
  return choice;
}
function getUserChoice() {
  let choice = prompt(`Make your choice! #f255`);
  return choice[0].toUpperCase() + choice.slice(1).toLowerCase();
}

function playRound(computerChoice, userChoice) {
  rps = ['Rock', 'Paper', 'Scissors'];
  let usrResult;
  let winner;
  let loser;

  let checkRound = (a,b) => ((a > b) ? [a, b, 'lose'] :
                         (a == b) ? [,,'tied'] :
                         [b,a,'win']
                       );

  if (rps.includes(computerChoice) && rps.includes(userChoice)) {
    let computerValue = rps.indexOf(computerChoice);
    let userValue = rps.indexOf(userChoice);

    if (computerValue === 0 && userValue === 2 ||
        computerValue === 2 && userValue === 0) {
      [loser, winner, usrResult] = checkRound(userValue, computerValue);
    }
    else {
      [winner, loser, usrResult] = checkRound(computerValue, userValue);
    }

    usrResult = usrResult ?? 'no wins'
    winner = (rps[winner]) ?? 'Nothing';
    loser = (rps[loser]) ?? "...";
    let str = `You ${usrResult}! ${winner} beats ${loser}`;

    return [winner, str];
  }
  return [winner, "Please, enter a valid input, nobody wins..."];
}

function game(play, computer, user) {
  let computerScore = 0;
  let userScore = 0;
  let computerChoice;
  let userChoice;
  let playData;

  for (let i = 1; i <= 5; i++) {
    console.group(`${i}th round:`)
    computerChoice = computer();
    userChoice = user();
    console.log(`Computer Choice          ${computerChoice}`);
    console.log(`User Choice              ${userChoice}`);

    playData = play(computerChoice, userChoice);
    console.log(playData[1]);

    (playData[0] === computerChoice) ? computerScore++ :
    (playData[0] === userChoice) ? userScore++ :
    console.log("Nobody wins...");
    console.log(`Computer: ${computerScore}   -   User: ${userScore}`);
    console.groupEnd('---')
  }
  (userScore > computerScore) ?
    console.info(`
      Final Result: YOU WIN!!
      You:  ${userScore}
      Computer: ${computerScore}
    `) :
  (userScore == computerScore) ?
    console.info(`
      Final Result: YOU TIED!!
      Computer: ${computerScore}
      You:  ${userScore}
    `) :
    console.info(`
      Final Result: YOU LOSE!!
      Computer: ${computerScore}
      You:  ${userScore}
    `)
}
game(playRound, getComputerChoice, getUserChoice);
