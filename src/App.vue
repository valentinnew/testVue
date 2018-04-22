<template>
    <div id="app">
        <div class="col-50"><catalog/></div>
        <div class="col-50"><shopcart/></div>
    </div>
</template>

<script>
    import CatalogComponent from './components/Catalog'
    import ShopcartComponent from './components/Shopcart'
    import CarrencyModule from './modules/Currency'
    import CatalogModule from './modules/Catalog'

    export default {
        name: 'App',
        components: {
            Catalog: CatalogComponent,
            Shopcart: ShopcartComponent
        },
        created: function() {
            // обновление курса и одгрузка данных
            setInterval(function() {
                CarrencyModule.set({
                    rate: parseInt(Math.random() * 60) + 20,
                    prefix: '',
                    postfix: ' руб'
                });

                CatalogModule.getAll(true);
            }, 15000);

        }
    }
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    margin-top: 60px;
}
#app .col-50 {
    width: 50%;
    float: left;
    box-sizing: border-box;
    border-right: 1px solid black;
}
#app .col-50:last-child {
    border-right: none;
}
</style>
