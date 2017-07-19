/**
 * Created by morroc on 2017/7/10.
 */
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
    }
});

requirejs(['app/grid', 'app/modal'], function(grid, modal) {
    // vue component
    Vue.component('modal', {
        template: '#modal-template'
    });

    let url = '/instance';
    let name = 'instance';

    let Storage = {
        fetch: function(ins) {
            let result;
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'json',
                async: false,
                data: ins,
                success: (data) => {
                    result = data.data;
                }
            });
            return result;
        },
        add: function(ins) {
            $.ajax({
                type: 'POST',
                url: url + "/add",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(ins),
                complete: (msg) => {
                    console.log(msg);
                    if (msg.responseJSON.msg === "success"){
                        alert("Add instance success.");
                        app.$emit("Success", ins);
                    }
                }
            });
        },
        update: function(ins, oldIns) {
            let data = {
                newIns: ins,
                oldIns: oldIns
            };
            $.ajax({
                type: 'POST',
                url: url + "/update",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
                complete: (msg) => {
                    console.log(msg);
                    if (msg.responseJSON.msg === "success") {
                        alert("Update instance success.");
                        app.$emit("Success", ins);
                    }
                }
            });
        },
        del: function(ins) {
            $.ajax({
                type: 'POST',
                url: url + "/delete",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(ins),
                complete: (msg) => {
                    console.log(msg);
                    if (msg.responseJSON.msg === "success") {
                        alert("Delete instance success.");
                        app.$emit("Success", ins);
                    }
                }
            });
        }
    };

    let app = new Vue({
        el: '#app',
        data: {
            instances : [],
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
            }
        },
    });
});



