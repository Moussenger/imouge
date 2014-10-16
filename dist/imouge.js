"use strict";

var imouge = {};

(function () {
    try {
        module.exports = imouge;
    } catch (e) { }
})();
(function (obj) {
    var _c;

    _c = obj.color = obj.color || {};

    _c.brightness = {
        get : function (r, g, b) {
            return Math.round((r + g + b) / 3);
        }
    }
})(imouge);
(function (obj) {
    var _i, _calc, _fixRegion, _getRegion, _getGrayMatrix, _expandGrayMatrix;

    _i = obj.image = obj.image || {};


    _getRegion = function (image, iwidth, pos, offset) {
        var region, i, j, li, lj;

        region = new Array();

        for(i = -offset, li=offset; i <= li; i++) {
            region[i+offset] = new Array();
            
            for(j = -offset, lj = offset; j <= lj; j++) {
                region[i+offset][j+offset] = image[pos + (iwidth*i + j)] || undefined;
            }
        }

        if(pos == 0) console.log(region);
        return region;

    };

    _fixRegion = function (region, type) {
        var i, j, li, lj, cent;

        //TODO: Get cent by type
        cent = region[Math.floor(region.length / 2)][Math.floor(region.length / 2)]

        for(i=0, li=region.length; i<li; i++) {
            for(j=0, lj=region.length; j<lj; j++) {
                if(region[i][j] === undefined) region[i][j] = cent;
            }
        }
    };

    _calc = function (region, matrix, fn, options) {
        //TODO: Fix region with options
        _fixRegion(region);

        return fn(matrix, region, options.calc);
    };

    _getGrayMatrix = function (brightnessImage) {
        var grayMatrix, i, l;

        grayMatrix = [];

        for(i=0, l=brightnessImage.length; i<l; i+=4) {
            grayMatrix.push(brightnessImage[i]);
        }

        return grayMatrix;
    };

    _expandGrayMatrix = function (grayMatrix) {
        var brightnessImage, i, j, l;

        brightnessImage = [];

        for(i=0, l=grayMatrix.length; i<l; i++) {
            for(j=0; j<4; j++){
                brightnessImage.push(grayMatrix[i]);
            }
        }

        return brightnessImage;
    };


    _i.convolution = {
        filter : function (brightnessImage, iwidth, matrix, fn, options) {
            var grayMatrix, result, region, i, l, offset;

            grayMatrix = _getGrayMatrix(brightnessImage);

            result = new Array();
            offset = Math.floor(matrix.length / 2);

            for(i=0, l=grayMatrix.length; i < l; i++) {
                region    = _getRegion(grayMatrix, iwidth, i, offset);
                result[i] = _calc(region, matrix, fn, options);
            }

            result = _expandGrayMatrix(result);
            return result;
        },
    }
})(imouge);
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