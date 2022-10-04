// Executes when any key is hit 
const gamePage = document

// Fetches the container div for the game
const gmSpc = document.querySelector('.gameSpace') 

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
  gamePage.onkeydown = kyHndlr
}

// Select random motion 
function pickDir () {
  const rndNmbr = Math.floor(Math.random()*prompts.length)
  const prmpt = prompts[rndNmbr]
  return prmpt
}

// Makes new prompt 
function mkPrompt (message) {
  const prmpt = document.querySelector('#prompt')
  prmpt.innerText = message 
}

function kyHndlr (e) {
  const direction = pickDir()
  console.log(e.key)
  mkPrompt(direction)
  keyChk (e.key, direction)
}

// Checks user keystroke against motion prompt
function keyChk (keyStroke,motion) {
  if (
    (keyStroke === "h" && motion === 'move left') ||
    (keyStroke === "j" && motion === 'move down') ||
    (keyStroke === "k" && motion === 'move up') ||
    (keyStroke === "h" && motion === 'move left') 
  ) {
    awrdPnts()
  }else{
    sbtrctPnts()
  }
}

function awrdPnts() {
  console.log("+100 points")
}

function sbtrctPnts() {
  console.log("-100 points")
}

startGame()
