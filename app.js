const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (evt) => {
  evt.preventDefault()
  if (evt.code.toLowerCase() === 'space') {
    setRenderColors()
  } 
})

document.addEventListener('click', (evt) => {
  const type = evt.target.dataset.type

  if (type === 'lock') {
    const node = evt.target.tagName.toLowerCase() === 'i'
    ? evt.target
    : evt.target.children[0]

    node.classList.toggle('fa-unlock-alt');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyToClickboard(evt.target.textContent)
  }
})

// function genRandomColor() {
//   const hexCod = '0123456789ABCDEF';


//   let color = '';
//   for (let i = 0; i < 6; i++) {
//     color += hexCod[Math.floor(Math.random() * hexCod.length)]
//   }

//   return '#' + color
// }

function copyToClickboard(text) {
  return navigator.clipboard.writeText(text)
}

function setRenderColors() {
  cols.forEach((col) => {
  const isLock = col.querySelector('i').classList.contains('fa-lock')
  const text = col.querySelector('h2')
  const button = col.querySelector('button')
  // const color = genRandomColor()
  const color = chroma.random()

  if (isLock) {
    return
  }

  text.textContent = color
  col.style.background = color

  setTextColor(text, color)
  setTextColor(button, color)
  })
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? 'black' : 'white'
}

setRenderColors()