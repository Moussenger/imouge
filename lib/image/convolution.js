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