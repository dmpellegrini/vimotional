// Stores the gamePage in a variable 
const gamePage = document

// Fetches the container div for the game
const gmSpc = document.querySelector('.gameSpace') 

// Fetches the scoreboard div
const scoreBoard = document.querySelector('.scoreBoard')

// Fetches the prompt header
const prmptTag = document.querySelector('#prompt')

// Declares the motion prompts
const prompts = [
  'move up',
  'move down',
  'move left',
  'move right'
]

// Sets the initial direction to blank string 
let direction = "" 

// Declares a variable for points log
let points = 0

// Declares timer and sets to 0 seconds
let msLeft = 0

// Declares variables to track keystroke stats
let allKy = 0
let goodKy = 0
let badKy = 0

// Sets keystroke behavior
gamePage.onkeydown = (e) => {
  if (direction === "" && e.key === 's') {
    startGame()
  }
  else if(msLeft > 0 && direction !== "") {
    makeMove(e)
  }
  else if(msLeft <= 0 && e.key === 'r') {
    setGame()  
  }
}

// Starts the game
function newGame () {
  setGame()
}

// Sets all game stats
function setGame () {
  msLeft = 10000
  points = 0
  allKy = 0
  goodKy = 0
  badKy = 0
  direction = ""
  score.innerText = ""
  timer.innerText = ""
  mkPrompt(`Hit "s" to start the game!`)
}

function startGame () {
  strtTimer()
  setScore()
  direction = pickDir()
  mkPrompt(direction)
}

function makeMove (e) {
  kyHndlr(e, direction)
  direction = pickDir()
  mkPrompt(direction)
}

function endGame () {
  mkPrompt(mkStats())
}

// Resets game after timer hits 0
function resetGame () {
  setTimeout(() => {
    setGame()
  }, 3000)
}

// Interpolates and formats points for display
function frmtPoints (points) {
  const pointStrng = `${points}`
  const pointScore = "Score: " + pointStrng.padStart(4,'0')
  return pointScore
}

// Set score
function setScore () {
  let score = document.querySelector('#score')
  score.innerText = frmtPoints(points) 
}

// Formats player stats for display
function mkStats () {
  if (allKy === 0) {
    allKy = 1
  }
  const accuracy = Math.floor((goodKy/allKy)*100)
  const endMsg = 
   `You made ${goodKy} of ${allKy} moves and ${badKy} mistakes
    You are ${accuracy}% in touch with your Vim-motions
    Press "r" to reset game`
  return endMsg
}

// Selects a random motion 
function pickDir () {
  const rndNmbr = Math.floor(Math.random()*prompts.length)
  const prmpt = prompts[rndNmbr]
  return prmpt
}

// Makes new prompt 
function mkPrompt (message) {
  prmptTag.innerText = message 
}

// Handles key strokes
function kyHndlr (e,direction) {
  keyChk (e.key, direction)
  allKy ++
}

// Checks user keystroke against motion prompt
function keyChk (keyStroke,direction) {
  console.log(keyStroke,direction)
  if (
    (keyStroke === "h" && direction === 'move left') ||
    (keyStroke === "j" && direction === 'move down') ||
    (keyStroke === "k" && direction === 'move up') ||
    (keyStroke === "l" && direction === 'move right') 
  ) {
    awrdPnts()
  }else{
    sbtrctPnts()
  }
  direction = pickDir()
  mkPrompt(direction)
}

// Awards points to user
function awrdPnts() {
  points += 10
  goodKy ++
  score.innerText = frmtPoints(points) 
}

// Subtracts points from user
function sbtrctPnts() {
  points -= 10
  badKy ++
  score.innerText = frmtPoints(points) 
}

// Makes and starts a countdown 
function strtTimer () {
  const timer = document.querySelector('#timer')
  timer.innerText = ms2scnds(msLeft) 
  let countdown = setInterval(() => {
    msLeft -= 1000
    timer.innerText = ms2scnds(msLeft) 
    if (msLeft <= 0) {
      endGame()
      clearInterval(countdown)
    }
  }, 1000)
}

// Converts miliseconds to seconds for timer
function ms2scnds (ms) {
  const scnds = `${ms/1000}`
  return "Time: " + scnds.padStart(2,'0')
}

setGame()
