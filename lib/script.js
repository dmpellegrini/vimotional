// Stores the gamePage in a variable 
const gamePage = document

// Fetches the container div for the game
const gmSpc = document.querySelector('.gameSpace') 

// Fetches the scoreboard div
const scoreBoard = document.querySelector('.scoreBoard')

// Fetches the header for prompt
const prmptTag = document.querySelector('#prompt')

// Declares the motion prompts
const prompts = [
  'move_up',
  'move_down',
  'move_left',
  'move_right'
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

// Sets keystroke behavior for game
function setKeystroke () {
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
}

// Makes new prompts and assigns them to DOM 
function mkPrompt (message) {
  prmptTag.innerText = message 
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
  setKeystroke()
  clearColors()
  mkPrompt(`Hit "s" to start the game!`)
}

// Selects a random motion from motion prompts array
function pickDir () {
  const rndNmbr = Math.floor(Math.random()*prompts.length)
  const prmpt = prompts[rndNmbr]
  return prmpt
}

// Converts miliseconds to seconds for timer
function ms2scnds (ms) {
  const scnds = `${ms/1000}`
  return "Time: " + scnds.padStart(2,'0')
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

// Toggles color to yellow in CSS 
function yellowToggle (direction) {
  arrow = document.querySelector(`#${direction}`)
  arrow.classList.toggle('yellow')
}

// Flashes color to green in CSS 
function greenToggle (direction) {
  arrow = document.querySelector(`#${direction}`)
  arrow.classList.toggle('green')
  gamePage.onkeydown = () => {}
  setTimeout(() => {
    arrow.classList.toggle('green')
  }, 100)
}

// Flashes color to red in CSS 
function redToggle (direction) {
  arrow = document.querySelector(`#${direction}`)
  arrow.classList.toggle('red')
  gamePage.onkeydown = () => {}
  setTimeout(() => {
    arrow.classList.toggle('red')
  }, 100)
}

// Starts the game
function startGame () {
  strtTimer()
  setScore()
  direction = pickDir()
  mkPrompt(direction)
  yellowToggle(direction)
}

// Handles player moves
function makeMove (e) {
  yellowToggle(direction)
  kyHndlr(e.key, direction)
}

// Handles user keystroke against motion prompt
function kyHndlr (keyStroke,crntDirection) {
  if (
    (keyStroke === "h" && crntDirection === 'move_left') ||
    (keyStroke === "j" && crntDirection === 'move_down') ||
    (keyStroke === "k" && crntDirection === 'move_up') ||
    (keyStroke === "l" && crntDirection === 'move_right') 
  ) {
    awrdPnts()
    greenToggle(crntDirection)
    
  }else{
    sbtrctPnts()
    redToggle(crntDirection)
  }
  allKy ++
  direction = pickDir()
  mkPrompt(direction)
  setTimeout(() => {
    yellowToggle(direction)
    setKeystroke()
  }, 101)
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

// Interpolates and formats points for display
function frmtPoints (points) {
  const pointStrng = `${points}`
  const pointScore = "Score: " + pointStrng.padStart(4,'0')
  return pointScore
}

// Sets score in the DOM
function setScore () {
  let score = document.querySelector('#score')
  score.innerText = frmtPoints(points) 
}

// Formats player stats for end game display
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

// Clears colors
function clearColors () {
  const up = document.querySelector('#move_up')
  const left = document.querySelector('#move_left')
  const right = document.querySelector('#move_right')
  const down = document.querySelector('#move_down')
  up.classList.remove('red','green','yellow')
  left.classList.remove('red','green','yellow')
  right.classList.remove('red','green','yellow')
  down.classList.remove('red','green','yellow')
  console.log(up,left,right,down)
}

// Handles end of game conditions
function endGame () {
  mkPrompt(mkStats())
  // clearColors()
}

// Provides delayed reset functionality
function resetGame () {
  setTimeout(() => {
    setGame()
  }, 3000)
}

setGame()
