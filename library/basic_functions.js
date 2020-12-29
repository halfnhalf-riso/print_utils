/* =========================
   File Functions
========================= */
function keyPressed() {
  // Press "s" to save canvas as .png.
  if (keyCode == 83) {
    save();
  }

  // Press SHIFT + "s" to save each color layer as its own .png.
  if (keyCode == SHIFT && keyCode == 83) {
    exportRiso();
  }
}


/* =========================
   Canvas Functions
========================= */
const PIXEL_RATIO = (function () {
  let context = document.createElement("canvas").getContext("2d");

  let dpr = window.devicePixelRatio || 1;
  let bspr = context.webkitBackingStorePixelRatio ||
             context.mozBackingStorePixelRatio ||
             context.msBackingStorePixelRatio ||
             context.oBackingStorePixelRatio ||
             context.backingStorePixelRatio ||
             1;

  return dpr/bspr;
})();

function inchesToPixels(inches, dpi = 300) {
  return inches*dpi;
}

function adjustToDPI(canvas, ratio = PIXEL_RATIO) {
  canvas.style.width = `${canvas.width}px`;
  canvas.style.height = `${canvas.height}px`;

  canvas.width = canvas.width * ratio;
  canvas.height = canvas.height * ratio;

  drawingContext.setTransform(ratio, 0, 0, ratio, 0, 0);

  return canvas;
}


/* =========================
   Color Functions
========================= */
function getLuminance(r, g, b) {
  return (0.3 * r) + (0.59 * g) + (0.11 * b);
}

function isMatchOrTint(scR, scG, scB, r, g, b, leniancy = 0.04) {
  let rRatio = (255 - r)/(255 - scR);
  let gRatio = (255 - g)/(255 - scG);
  let bRatio = (255 - b)/(255 - scB);

  if (rRatio == gRatio && gRatio == bRatio) {
    return true;
  }
  else {
    let leniancyRange = leniancy * 255;

    if ((r > scR - leniancyRange && r < scR + leniancyRange) &&
        (g > scG - leniancyRange && g < scG + leniancyRange) &&
        (b > scB - leniancyRange && b < scB + leniancyRange)) {
      return true;
    }
  }

  return false;
}
