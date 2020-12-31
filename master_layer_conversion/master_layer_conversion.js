function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  adjustToDPI(canvas);
  canvas.parent("master_layer_conversion");

  $("#image_form input[type='file']").on("change", function() {
    var fileList = $(this)[0].files;

    for (let i = 0; i < fileList.length; i++) {
      var file = fileList[i];

      if (file.type.startsWith("image/")) {
        var img_file = document.createElement("img");
        img_file.file = file;

        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (function(img) {
          return function(e) {
            loadImage(e.target.result, p5Img => {
              clearRiso();

              resizeCanvas(p5Img.width, p5Img.height);
              
              var master_layer = new Riso("black");
              master_layer.fill(255);
              master_layer.image(p5Img, 0, 0);

              drawRiso();
            });
          };
        })(img_file);
      }
    }
  });
}
