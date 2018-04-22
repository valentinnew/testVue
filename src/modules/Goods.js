import Vue from 'vue'

var Goods = function () {

};

var requestPromise;
Goods.prototype.getAll = function () {
    if (requestPromise !== undefined) {
        return requestPromise;
    }

    requestPromise = new Promise(function(resolve, reject) {
        Vue.http.get('/static/resources/goods.json').then(function (response) {
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
            resolve(response.body.Value.Goods);
        }, function () {
            reject('request error');
        });
    });

    return requestPromise;
};
Goods.prototype.getAllByCategory = function (categoryId) {

};
Goods.prototype.getOne = function (categoryId, goodsId) {

};

export default new Goods();