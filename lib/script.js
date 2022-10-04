// Executes when any key is hit 
document.onkeydown = (e) => {
  console.log(e.key)
  mkPrmpt()
}

// Fetches the container div for the game
const gmSpc = document.querySelector('.container') 

// Stores motion prompts
const prompts = [
  'move up',
  'move down',
  'move left',
  'move right'
]

function mkPrmpt () {
  const rndNmbr = Math.floor(Math.random()*4)
  const mvmtMsg = document.createElement('h2')
  mvmtMsg.innerText = prompts[rndNmbr]
  gmSpc.innerHTML = ""
  gmSpc.appendChild(mvmtMsg)
}

