import Vue from 'vue'

var Catalog = function () {
};

var requestPromise;

var goodByCatalogId = {};

function updateGoods(goods) {
    var goodsId = goods.T;
    if (goodByCatalogId[goodsId] === undefined) {
        goodByCatalogId[goodsId] = goods;
    } else {
        goodByCatalogId[goodsId].B  = goods.B;
        goodByCatalogId[goodsId].C  = goods.C;
        goodByCatalogId[goodsId].CV = goods.CV;
        goodByCatalogId[goodsId].G  = goods.G;
        goodByCatalogId[goodsId].P  = goods.P;
        goodByCatalogId[goodsId].Pl = goods.Pl;
        goodByCatalogId[goodsId].T  = goods.T;
    }
}

Catalog.prototype.getAll = function (force) {
    if (!force && requestPromise !== undefined) {
        return requestPromise;
    }

    requestPromise = new Promise(function(resolve, reject) {
        Vue.http.get('/static/resources/catalog.json').then(function (response) {
            if (response.body === undefined || response.body.Success === undefined) {
                reject('invalid response');
                return;
            }
            if (response.body.Success !== true) {
                if (response.body.Error !== undefined) {
                    reject('request error');
                } else {
                    reject(response.body.Error);
                }
                return;
            }

            // для того, чтобы объект остался тот же и не потерялись связи нужно обновлять только его свойства
            for (var i in response.body.Value.Goods) {
                if (!response.body.Value.Goods.hasOwnProperty(i)) {
                    continue;
                }
                var goods = response.body.Value.Goods[i];
                updateGoods(goods);
            }

            resolve(goodByCatalogId);
        }, function () {
            reject('request error');
        });
    });

    return requestPromise;
};

Catalog.prototype.getOne = function (goodsId) {
    var self = this;
    return new Promise(function(resolve, reject) {
        self.getAll().then(function(goods) {
            if (goodByCatalogId[goodsId] === undefined) {
                reject('goodsId not found');
            } else {
                resolve(goodByCatalogId[goodsId]);
            }
        }, function (msg) {
            reject(msg)
        });
    });
};

export default new Catalog();