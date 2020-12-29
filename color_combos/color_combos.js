const CANVAS_WIDTH = inchesToPixels(11);
const CANVAS_HEIGHT = inchesToPixels(8.5);
const MAX_HEIGHT = inchesToPixels(8.5);

const PADDING = inchesToPixels(0.5);

const DEGREES = 20;
const SPACER = 5;
const SPACERS_TOTAL = SPACER * (DEGREES - 1);

const TEXT_SIZE = 36;
const TEXT_PADDING = 10;

function setup() {
  let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  adjustToDPI(canvas);
  canvas.parent("color_combos");

  background(255);

  let colorPair = random(ALL_COLOR_COMBOS.TwoColor);
  let color1 = new Riso(colorPair[0]);
  let color2 = new Riso(colorPair[1]);

  color1.textSize(TEXT_SIZE);
  color1.textFont("Courier New");
  color1.textAlign(CENTER, BOTTOM);

  color2.textSize(TEXT_SIZE);
  color2.textFont("Courier New");
  color2.textAlign(RIGHT, CENTER);

  risoNoStroke();

  let shortestSide = canvas.width <= MAX_HEIGHT ? canvas.width : MAX_HEIGHT;
  let swatchSize = (shortestSide - (PADDING * 2) - SPACERS_TOTAL)/DEGREES;

  let chartSize = (DEGREES * swatchSize) + SPACERS_TOTAL;
  let xOffset = (canvas.width - chartSize)/2;
  let yOffset = (canvas.height - chartSize)/2;

  for (let y = 0; y < DEGREES; y++) {
    for (let x = 0; x < DEGREES; x++) {
      let xPos = (x * swatchSize) + (x * SPACER) + xOffset;
      let yPos = (y * swatchSize) + (y * SPACER) + yOffset;

      // Between 0 - 1
      let xRatio = (x + 1)/DEGREES;
      let yRatio = (y + 1)/DEGREES;

      // Swatch
      color1.fill(xRatio * 255);
      color1.rect(xPos, yPos, swatchSize);
      color1.text(`${Math.round(xRatio * 100)}%`, xPos + (swatchSize/2), yOffset - TEXT_PADDING);

      color2.fill(yRatio * 255);
      color2.rect(xPos, yPos, swatchSize);
      color2.text(`${Math.round(yRatio * 100)}%`, xOffset - TEXT_PADDING, yPos + (swatchSize/2));
    }
  }

  drawRiso();
}
