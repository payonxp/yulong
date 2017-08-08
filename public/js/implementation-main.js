/**
 * Created by morroc on 2017/7/10.
 */
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
    }
});

requirejs(['app/grid', 'app/modal', 'app/storage'], function(grid, modal, storage) {
    // vue component
    Vue.component('modal', {
        template: '#modal-template'
    });

    let url = '/implementation';
    let name = 'implementation';

    let Storage = storage(url);

    let app = new Vue({
        el: '#app',
        data: {
            implementations : [],
            showModal : false,
            showAdd: false,
            current: null,
            currentCache: null,
            currentSubTable: null,
            Filter: {},
        },
        created: function () {
            let data = Storage.fetch();
            grid.initGrid(document.getElementById(name), data[0], "implementations", true);
            modal.initModal(document.getElementById("edit-modal"), data[0]);
            modal.initModal(document.getElementById("add-modal"), data[0]);
            this.implementations = data;

            this.$on('delete', function(obj) {
                this.del(obj);
                this.showModal = false;
            });
            this.$on('close', function(obj) {
                obj = {};
                Object.keys(this.currentCache).forEach((key) => obj[key] = this.currentCache[key] );
                this.showModal = false;
            });
            this.$on('update', function(obj) {
                this.update(obj, this.currentCache);
                this.showModal = false;
            });
            this.$on('add', function (obj) {
                this.add(obj);
                this.showAdd = false;
            });
            this.$on('close-add', function (obj) {
                this.showAdd = false;
            });
            this.$on('filter', function () {
                this.query(this.Filter);
            });
            this.$on('Success', function (obj) {
                this.query();
            });
            this.$on('select', function (obj) {
                this.current = obj;
            });
        },
        methods: {
            query: function(ins){
                this.implementations = Storage.fetch(ins);
            },
            add: function(ins) {
                Storage.add(ins);
            },
            del: function (ins) {
                Storage.del(ins);
            },
            update: function (ins, oldIns) {
                Storage.update(ins, oldIns);
            },
            cache: function(ins) {
                this.currentCache = {};
                Object.keys(ins).forEach((key) => this.currentCache[key] = ins[key]);
            },
        },
    });
});



