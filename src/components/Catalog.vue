<template>
    <div class="catalog">
        <div class="header">Каталог</div>
        <div class="categories">
            <div class="category" v-for="category in categories" v-if="hasGoodsInCategory(category)">
                <div class="header">
                    {{ category.G }}
                </div>
                <div class="goods">
                    <div class="goods-item" v-for="(goods, goodsId) in category.B" v-if="getCount(goodsId) > 0" @click="addToShopcart(goodsId)">
                        <div class="title">{{ goods.N }}</div>
                        <div class="count">{{ getCount(goodsId) }}</div>
                        <price v-bind:base-price="getPrice(goodsId)"></price>
                        <div class="price">{{ getPrice(goodsId) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GoodsModule from '../modules/Goods.js'
    import CatalogModule from '../modules/Catalog.js'
    import ShopcartModule from '../modules/Shopcart.js'

    import PriceComponent from './Price.vue'

    export default {
        components: {
            Price: PriceComponent
        },
        data: function() {
            return {
                categories: [],
                catalog: {}
            }
        },
        methods: {
            /**
             * Возвращает количество товара по каталогу
             * @param goodsId
             * @returns {number}
             */
            getCount: function (goodsId) {
                if (this.catalog[goodsId] === undefined) {
                    return 0;
                } else {
                    return this.catalog[goodsId].P;
                }
            },
            /**
             * Возвращает цену по каталогу
             * @param goodsId
             * @returns {string}
             */
            getPrice: function (goodsId) {
                if (this.catalog[goodsId] === undefined) {
                    return '-';
                } else {
                    return this.catalog[goodsId].C;
                }
            },
            /**
             * Проверряет, есть ли товар по каталогу к категории
             * @param category
             * @returns {boolean}
             */
            hasGoodsInCategory: function (category) {
                for (var i in category.B) {
                    if (this.catalog[i] !== undefined && this.catalog[i].P > 0) {
                        return true;
                    }
                }
                return false;
            },
            /**
             * Добавляет товар в корзину
             * @param goodsId
             */
            addToShopcart: function(goodsId) {
                ShopcartModule.add(goodsId).then(function(shopcartGoods){
                    console.log(shopcartGoods);
                });
            }
        },
        created: function () {
            // подгрузка товаров и каталога
            var self = this;
            GoodsModule.getAll().then(function(result) {
                self.categories = result;
            });

            CatalogModule.getAll().then(function(result) {
                self.catalog = result;
            });
        }
    };
</script>

<style>
    .catalog {
        width: 100%;
    }
    .catalog .category {
        margin-top: 15px;
        border-bottom: 1px solid black;
    }
    .catalog .goods-item {
        width: 100%;
        overflow: hidden;
        border-top: 1px solid black;
    }
    .catalog .goods-item .title {
        width: 60%;
        float: left;
    }
    .catalog .goods-item .count {
        width: 20%;
        float: left;
    }
    .catalog .goods-item .price {
        width: 20%;
        float: left;
    }
</style>