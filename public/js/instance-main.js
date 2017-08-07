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

    let url = '/instance';
    let name = 'instance';

    let Storage = storage(url);
    let CacheStorage = storage(url+'/cache');
    let DataSourceStorage = storage(url+'/data_source');
    let RepositoryStorage = storage(url+'/repository');

    let app = new Vue({
        el: '#app',
        data: {
            instances : [],
            subData: [],
            showModal : false,
            showAdd: false,
            current: null,
            currentCache: null,
            Filter: {}
        },
        created: function () {
            let data = Storage.fetch();
            grid.initGrid(document.getElementById(name), data[0], "instances");
            modal.initModal(document.getElementById("edit-modal"), data[0]);
            modal.initModal(document.getElementById("add-modal"), data[0]);
            this.instances = data;
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
        },
        methods: {
            query: function(ins){
                this.instances = Storage.fetch(ins);
                console.log(this.instances);
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
            sub_query: function (storage, obj) {
                this.subData = storage.fetch(obj);
                console.log(this.subData);
            },
            sub_add: function (storage, obj) {
                storage.add(obj);
            },
            sub_del: function (storage, obj) {
                storage.del(obj);
            },
            sub_update: function (storage, obj, oldObj) {
                storage.update(obj, oldObj);
            }
        },
    });
});



