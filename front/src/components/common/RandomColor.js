var color,
  letters = "0123456789ABCDEF".split("");
function AddDigitToColor(limit) {
  color += letters[Math.round(Math.random() * limit)];
}
function GetRandomColor() {
  color = "#";
  AddDigitToColor(5);
  for (var i = 0; i < 5; i++) {
    AddDigitToColor(15);
  }
  return color;
}

export default GetRandomColor;
