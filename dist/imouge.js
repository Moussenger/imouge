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