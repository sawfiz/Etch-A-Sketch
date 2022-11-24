const Dot = (color) => ({
  get color() {
    return color;
  },
  set color(value) {
    color = value;
  },
});

export default Dot;
