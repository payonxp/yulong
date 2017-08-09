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
            showAddInstance: false,
            current: null,
            currentCache: null,
            currentSubTable: null,
            Filter: {},
            subStorage: {
                CacheStorage : CacheStorage,
                DataSourceStorage: DataSourceStorage,
                RepositoryStorage: RepositoryStorage
            },
            showSubTable: {
                Cache: true,
                DataSource: true,
                Repository: true,
            }
        },
        created: function () {
            let data = Storage.fetch();
            grid.initGrid(document.getElementById(name), data[0], "instances", true);
            modal.initModal(document.getElementById("edit-modal"), data[0]);
            modal.initModal(document.getElementById("add-modal"), data[0]);
            this.instances = data;

            if (data.length > 0) {
                this.current = this.instances[0];
            }

            let cache = this.subStorage.CacheStorage.fetch(data[0]);
            if (cache.length > 0) {
                grid.initGrid(document.getElementById("sub-table-cache"), cache[0], "subData", false);
                this.subData = cache;
            }

            let ds = this.subStorage.DataSourceStorage.fetch(data[0]);
            if (ds.length > 0) {
                grid.initGrid(document.getElementById("sub-table-data-source"), ds[0], "subData", false);
            }
            this.showSubTable.DataSource = false;

            let repository = this.subStorage.RepositoryStorage.fetch(data[0]);
            if (repository.length > 0) {
                grid.initGrid(document.getElementById("sub-table-repository"), repository[0], "subData", false);
            }
            this.showSubTable.Repository = false;

            this.$on('delete', function(obj) {
                this.del(obj);
                this.showModal = false;
            });
            this.$on('close', function(obj) {
                obj = {};
                Object.keys(this.currentCache).forEach((key) => obj[key] = this.currentCache[key] );
                this.showModal = false;
                this.query();
            });
            this.$on('update', function(obj) {
                this.update(obj, this.currentCache);
                this.showModal = false;
            });
            this.$on('add', function (obj) {
                this.add(obj);
                this.showAddInstance = false;
            });
            this.$on('close-add', function (obj) {
                this.showAddInstance = false;
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
            this.$on('showSubTable', function () {
                let str = this.currentSubTable;

                for (let key in this.showSubTable) {
                    this.showSubTable[key] = false;
                }

                if (str === 'data-source') {
                    this.subData = this.subStorage.DataSourceStorage.fetch(this.current);
                    this.showSubTable.DataSource = true;
                } else if (str === 'cache') {
                    this.subData = this.subStorage.CacheStorage.fetch(this.current);
                    this.showSubTable.Cache = true;
                } else if (str === 'repository') {
                    this.subData = this.subStorage.RepositoryStorage.fetch(this.current);
                    this.showSubTable.Repository = true;
                }
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
        },
    });
});



