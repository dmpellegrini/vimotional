// Stores the game in variable 
const gamePage = document

// Fetches the container div for the game
const gmSpc = document.querySelector('.gameSpace') 

// Fetches the prompt header
const prmptTag = document.querySelector('#prompt')

// Stores motion prompts
const prompts = [
  'move up',
  'move down',
  'move left',
  'move right'
]

// Starts the game
function startGame () {
  mkPrompt (`Hit any key to begin`)
  let direction = pickDir()
  gamePage.onkeydown = (e) => {
    if (prmptTag.innerText === "") {
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

startGame()
