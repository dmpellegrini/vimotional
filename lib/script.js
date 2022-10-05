// Stores the game in variable 
const gamePage = document

// Fetches the container div for the game
const gmSpc = document.querySelector('.gameSpace') 

// Fetches the scoreboard div
const scoreBoard = document.querySelector('.scoreBoard')

// Fetches the prompt header
const prmptTag = document.querySelector('#prompt')

// Stores motion prompts
const prompts = [
  'move up',
  'move down',
  'move left',
  'move right'
]

// Sets the initial direction to 0
let direction = "" 


// Starts the game
function startGame () {
  mkPrompt (`Hit any key to begin`)
  gamePage.onkeydown = (e) => {
    if (direction === "") {
      strtTimer()
      direction = pickDir()
      mkPrompt(direction)
    }else{
      kyHndlr(e, direction)
      direction = pickDir()
      mkPrompt(direction)
    }
  }
}

// Select random motion 
function pickDir () {
  const rndNmbr = Math.floor(Math.random()*prompts.length)
  const prmpt = prompts[rndNmbr]
  return prmpt
}

// Makes new prompt 
function mkPrompt (message) {
  prmptTag.innerText = message 
}

function kyHndlr (e,direction) {
  console.log
  keyChk (e.key, direction)

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

function awrdPnts() {
  console.log("+100 points")
}

function sbtrctPnts() {
  console.log("-100 points")
}

function strtTimer () {
  const timer = document.createElement('p')
  scoreBoard.append(timer)
  let msLeft = 10000
  let countdown = setInterval(() => {
    timer.innerText = ms2scnds(msLeft) 
    msLeft -= 1000
    if (msLeft < 0) {
      clearInterval(countdown)
    }
  }, 1000)

}

function ms2scnds (ms) {
  const scnds = `${ms/1000}`
  return "Time: " + scnds.padStart(2,'0')
}

startGame()

