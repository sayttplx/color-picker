const hexInput = document.querySelector('#hexInput');
const inputColor = document.querySelector('#inputColor');
const sliderText = document.querySelector('#sliderText');
const slider = document.querySelector('#slider');
const color = '#000000'


function hexCheck(str) {
  regexp = /^[0-9a-fA-F-]+$/;
  if (regexp.test(str)) {
    return true
  }
  else {
    return false
  }
}

// here with save the input.value and checks if not valid hex
// replaces the # from the input with a empty string
// adds the # again and the hexcode to the background-color
hexInput.addEventListener('keyup', () => {
  const hex = hexInput.value;

  if (!hexCheck(hex)) {
    inputColor.style.backgroundColor = color;
  };
  
  if (!isValidHex(hex)) return;
  const strippedHex = hex.replace('#', '');
  inputColor.style.backgroundColor = "#" + strippedHex;
})

// this function checks - if not a hex it returns false
// checks if the lenght of the hex is 3 or 6
// replaces the # from the input with a empty string
const isValidHex = (hex) => {
  if (!hex) return false;

  const strippedHex = hex.replace('#', '');
  return strippedHex.length === 3 || strippedHex.length === 6;
}

const convertHexToRGB = (hex) => {
  if(!isValidHex(hex)) return null;
  
  let strippedHex = hex.replace('#','');
  
  if(strippedHex.length === 3) {
    strippedHex = strippedHex[0] + strippedHex[0]
    + strippedHex[1] + strippedHex[1]
    + strippedHex[2] + strippedHex[2];
  }
  
  const r  = parseInt(strippedHex.substring(0,2), 16);
  const g  = parseInt(strippedHex.substring(2,4), 16);
  const b  = parseInt(strippedHex.substring(4,6), 16);
  
  return {r,g,b}
}

const convertRGBToHex = (r,g,b) => {
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);

  const hex = "#" + firstPair + secondPair + thirdPair;
  return hex
}

const alterColor = (hex, percentage) => {
  const {r,g,b} = convertHexToRGB(hex);

  const amount = Math.floor((percentage/100) * 255)

  const newR = increaseWithin0To255(r,amount)
  const newG = increaseWithin0To255(g,amount)
  const newB = increaseWithin0To255(b,amount)
  return convertRGBToHex(newR, newG, newB)
}

const increaseWithin0To255 = (hex, amount) => {
  const newHex = hex + amount;
  if(newHex > 255) return 255;
  if(newHex < 0) return 0;
  return newHex
}

slider.addEventListener('input', () => {
  console.log(slider.value)
  sliderText.textContent = `${slider.value}%`;
})