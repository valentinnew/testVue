// import Vue from 'vue'
import CatalogModule from './Catalog'

var Shopcart = function () {

};

var shopcartItems = [];
var goodsById = {};

Shopcart.prototype.getAll = function () {
    return new Promise(function(resolve) {
        resolve(shopcartItems);
    });
};

var getCatalogGoodsPromises = {};

Shopcart.prototype.add = function (goodsId) {
    return new Promise(function (resolve, reject) {
        if (goodsById[goodsId] === undefined) {
            if (getCatalogGoodsPromises[goodsId] !== undefined) {
                return getCatalogGoodsPromises[goodsId];
            }
            getCatalogGoodsPromises[goodsId] = CatalogModule.getOne(goodsId).then(function(goods) {
                if (goods.P === 0) {
                    reject('нет в наличии');
                } else {
                    goodsById[goodsId] = {
                        id: goodsId,
                        count: 1,
                        catalogGoods: goods,
                    };
                    shopcartItems.push(goodsById[goodsId]);

                    resolve(goodsById[goodsId]);
                }
                getCatalogGoodsPromises[goodsId] = undefined;
            });
        } else {
            if (goodsById[goodsId].catalogGoods.P - goodsById[goodsId].count <= 0) {
                goodsById[goodsId].count = goodsById[goodsId].catalogGoods.P;
            } else {
                ++goodsById[goodsId].count;
            }
        }
    });
};
Shopcart.prototype.remove = function (goodsId) {
    if (goodsById[goodsId] === undefined) {
        return;
    }

    var index = shopcartItems.indexOf(goodsById[goodsId]);
    shopcartItems.splice(index, 1);
    goodsById[goodsId] = undefined;
};
Shopcart.prototype.getTotalPrice = function () {
    var result = 0;
    for (var i in shopcartItems) {
        // умножаем на 100 чтобы работать с интами
        result += parseInt(shopcartItems[i].catalogGoods.C * 100) * shopcartItems[i].count;
    }

    return result/100;
};


export default new Shopcart();