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
            var i, l, value, histimg = [];

            for(i=0, l=image.length; i<l; i+=4) {
                value = obj.color.brightness.get(image[i], image[i+1], image[i+2]);
                histimg[i] = histimg[i+1] = histimg[i+2] = value;
                histimg[i+3] = image[i+3];
            }

            return histimg;
        },

        modify : function (brightnessImage, fn) {
            return brightnessImage.map(function (v) {
                return Math.round(fn(v));
            });
        },

        normalize : function (brightnessImage) {
            var norim, maxmin, max, min, len, dist, i, l;

            function maxminarr (a) {
                var i, l, maxa, mina, v;

                maxa = -Infinity;
                mina = Infinity;

                for(i=0, l=a.length; i<l; i++) {
                    v    = a[i];
                    maxa = maxa < v ? v : maxa;
                    mina = mina > v ? v : mina;
                }

                return [maxa, mina];
            }

            norim = new Array();
            maxmin = maxminarr(brightnessImage);

            max = maxmin[0];
            min = maxmin[1];

            len = max - min;

            for(i=0, l = brightnessImage.length; i<l; i++) {
                dist     = Math.abs(brightnessImage[i] - min);
                norim[i] = Math.floor(dist/len * 255);
            }

            return norim;

        },

        cut : function (brightnessImage) {
            var cutimage, i, li, value;

            cutimage = [];

            for (i=0, li = brightnessImage.length; i < li; i++) {
                value = brightnessImage[i];
                value = value > 255 ? 255 : (value < 0 ? 0 : value);
            };

            return brightnessImage;

        },
    }
})(imouge);