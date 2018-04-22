<template>
    <div class="shopcart">
        <div class="header">Корзина</div>
        <table>
            <tr>
                <th>Наименование товара и описание</th>
                <th>Количество</th>
                <th>Цена</th>
                <th></th>
            </tr>
            <tr v-for="shopcartGoodsItem in shopcartGoods">
                <td>{{ goods[shopcartGoodsItem.catalogGoods.G].B[shopcartGoodsItem.catalogGoods.T].N }}</td>
                <td>
                    <input type="number" v-model.lazy="shopcartGoodsItem.count" @change="onChangeCount(shopcartGoodsItem)"/>
                    <div class="count-limit" v-if="shopcartGoodsItem.count === shopcartGoodsItem.catalogGoods.P">Количество товара ограничено</div>
                </td>
                <td><price v-bind:base-price="shopcartGoodsItem.catalogGoods.C"></price></td>
                <td @click="remove(shopcartGoodsItem.id)">Удалить</td>
            </tr>
        </table>
        <div class="footer" v-if="getTotalPrice() > 0">
            общая стоимость: <price v-bind:base-price="getTotalPrice()"></price>
        </div>
    </div>
</template>
<script>
    import ShopcartModule from '../modules/Shopcart'
    import GoodsModule from '../modules/Goods'

    import PriceComponent from './Price.vue'

    export default {
        components: {
            Price: PriceComponent
        },
        data: function() {
            return {
                shopcartGoods: [],
                goods: {},
            }
        },
        methods: {
            getGoodsName: function(shopcartGoodsItem) {

            },
            remove: function(goodsId) {
                ShopcartModule.remove(goodsId);
            },
            getTotalPrice: function(){
                return ShopcartModule.getTotalPrice();
            },
            onChangeCount: function(shopcartGoodsItem) {
                if (shopcartGoodsItem.count > shopcartGoodsItem.catalogGoods.P) {
                    shopcartGoodsItem.count = shopcartGoodsItem.catalogGoods.P;
                }

                if (shopcartGoodsItem.count <= 0) {
                    this.remove(shopcartGoodsItem.id);
                }
            },
        },
        created: function () {
            var self = this;
            ShopcartModule.getAll().then(function(shopcartGoods){
                self.shopcartGoods = shopcartGoods;
            });
            GoodsModule.getAll().then(function(goods){
                self.goods = goods;
            });
        }
    };
</script>
<style>
    .shopcart {
    }
</style>