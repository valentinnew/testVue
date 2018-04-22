<template>
    <span class="price-currency" v-bind:class="status">{{currency.prefix}}{{price}}{{currency.postfix}}</span>
</template>

<script>
    import CurrencyModule from '../modules/Currency'

    export default {
        props: ['basePrice'],
        data: function() {
            return {
                currency: {
                    rate: 1,
                    prefix: '$',
                    postfix: ''
                },
                status: '',
            }
        },
        methods: {
        },
        computed: {
            price: function() {
                return (this.basePrice * this.currency.rate).toFixed(2);
            },
        },
        created: function () {
            var self = this;
            var currency = CurrencyModule.get();
            self.currency.rate    = currency.rate;
            self.currency.prefix  = currency.prefix;
            self.currency.postfix = currency.postfix;

            // здесь слушается изменение курса и подсвечивается нужным образом
            CurrencyModule.onChange.add(function(newCurrency){
                if (self.currency.rate > newCurrency.rate) {
                    self.status = 'price-rate-down';
                } else if (self.currency.rate < newCurrency.rate) {
                    self.status = 'price-rate-up';
                } else {
                    self.status = '';
                }

                setTimeout(function() {
                    self.status = '';
                }, 2000);

                self.currency.rate    = newCurrency.rate;
                self.currency.prefix  = newCurrency.prefix;
                self.currency.postfix = newCurrency.postfix;


            });
        }
    };
</script>

<style>
    .price-currency.price-rate-down {
        background-color: #5E740B;
    }
    .price-currency.price-rate-up {
        background-color: #880000;
    }
</style>