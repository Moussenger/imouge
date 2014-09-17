(function (obj) {
    var _i;

    _i = obj.image = obj.image || {};

    _i.histogram = {
        get : function (image) {
            var histogram, i, l, value;

            histogram = new Array(256);

            for(i=0; i<256; i++) { histogram[i] = 0; }

            for(i=0, l=image.length; i < l; i+=4) {
                value = obj.color.brightness.get(image[i], image[i+1], image[i+2]);
                histogram[value]++;
            }

            return histogram;
        },

        getImage : function (image) {
            var i, l, value;

            for(i=0, l=image.length; i<l; i+=4) {
                value = obj.color.brightness.get(image[i], image[i+1], image[i+2]);
                image[i] = image[i+1] = image[i+2] = value;
            }

            return image;
        },

        modify : function (brightnessImage, fn) {
            brightnessImage.map(function (v) {
                return Math.round(fn(v));
            });

            return brightnessImage;
        }
    }
})(imouge);