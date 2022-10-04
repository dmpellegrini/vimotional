// Logs all keystrokes of the web page
document.onkeydown = (e) => {
  console.log(e.key)
  console.log(mkPrompt())
}

// Stores motion prompts
const prompts = [
  'move up',
  'move down',
  'move left',
  'move right'
]

function mkPrompt () {
  const rndNmbr = Math.floor(Math.random()*4)
  console.log(prompts[rndNmbr])
}
