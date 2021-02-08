window.addEventListener("load",function() { newBackgroundColor() });

console.log('script.js loaded!');
let globalHexval;

const RGBToHex = (r,g,b) => {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  let hexVal = "#" + r + g + b
  console.log('HEX: '+ hexVal);
  globalHexval = hexVal;
  return hexVal
}

const randomValue = (startRange=0,maxRange) => {
  let randomValue = Math.floor(Math.random()*maxRange + startRange);
  while (randomValue > maxRange) {
    randomValue = Math.floor(Math.random()*maxRange + startRange);
  }
  //console.log(`Random value between ${startRange} and ${maxRange}: ${randomValue}`);
  return randomValue;

}

const newBackgroundColor = () => {
  // Skapa random mellan 0-255
  // håll värdet i let r-col, g-col, b-color
  let r = randomValue(0,255);
  let g = randomValue(0,255);
  let b = randomValue(0,255);

  let rgb_col = `rgb(${r}, ${g}, ${b})`;
  document.body.style.background = rgb_col;
  console.log(`RGB: ${r} / ${g} / ${b}`);
  let hexVal = RGBToHex(r,g,b);


  let hexPara = document.createElement('p');
  hexPara.innerText = hexVal;
  let finalPara = document.getElementById('the-container').appendChild(hexPara);
  finalPara.style = 'font-size:35px';
  finalPara.setAttribute('id', 'hex-color-id');
}

const copyColor = () => {
  let copiedVal = document.getElementById('hex-color-id');
  copiedVal.select();
  document.execCommand('copy');
  alert('copied following text: '+ copiedVal.value);
}
