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
    var _i;

    _i = obj.image = obj.image || {};

    _i.histogram = {
        get : function (image) {
            var histogram, i, l, value;

            histogram = new Array(255);

            for(i=0; i<255; i++) { histogram[i] = 0; }

            for(i=0, l=image.length; i < l; i+=4) {
                value = obj.color.brightness.get(image[i], image[i+1], image[i+2]);
                histogram[value]++;
            }

            return histogram;
        }
    }
})(imouge);