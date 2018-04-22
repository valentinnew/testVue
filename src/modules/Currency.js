
var Currency = function() {};


var currency = {
    rate: 64,
    prefix: '',
    postfix: ' руб'
};

var onChange = function () {
    this.handlers = [];
};
onChange.prototype.add = function (handler) {
    if (this.handlers.indexOf(handler) === -1) {
        this.handlers.push(handler);
    }
};
onChange.prototype.remove = function () {
    var index = this.handlers.indexOf(handler);
    if (index === -1) {
        return;
    }
    this.handlers.splice(index, 1);
};
onChange.prototype.trigger = function (currency) {
    var self = this;
    this.handlers.forEach(function(handler) {
        handler.call(self, currency);
    });
};
Currency.prototype.onChange = new onChange();

Currency.prototype.set = function(newCurrency) {
    currency.rate    = newCurrency.rate;
    currency.prefix  = newCurrency.prefix;
    currency.postfix = newCurrency.postfix;

    this.onChange.trigger(currency);
};
Currency.prototype.get = function() {
    return currency;
};

export default new Currency();