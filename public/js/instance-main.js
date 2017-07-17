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
        fetch: function() {
            let result;
            let queryParam = {};
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'json',
                async: false,
                data: queryParam,
                success: (data) => {
                    result = data.data;
                    console.log(data.msg)
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
                complete: (msg) => console.log(msg)
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
                complete: (msg) => console.log(msg)
            });
        },
        del: function(ins) {
            $.ajax({
                type: 'POST',
                url: url + "/delete",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(ins),
                complete: (msg) => console.log(msg)
            });
        }
    };

    let app = new Vue({
        el: '#app',
        data: {
            instances : [],
            showModal : false,
            current: null
        },
        created: function () {
            this.query();
        },
        methods: {
            query: function(){
                let data = Storage.fetch();
                grid.initGrid(document.getElementById(name), data[0], "instances");
                modal.initModal(document.getElementById("modal-body"), data[0]);
                this.instances = data;
            },
            add: function(ins) {
                Storage.add(ins);
            },
            del: function (ins) {
                Storage.del(ins);
            }
        },
        watch: {
            instances: {
                handler: function(val, oldVal) {
                    for (let i = 0;i< val.length; i++) {
                        if (val[i] !== oldVal[i]) {
                            if (!val[i]._dirty)
                                val[i]._dirty = true;
                            else
                                Storage.update(val[i], oldVal[i]);
                        }
                    }
                },
                deep:true
            }
        }
    });
});



