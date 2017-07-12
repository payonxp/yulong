/**
 * Created by morroc on 2017/7/10.
 */
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
    }
});

requirejs(['app/grid'], function(grid) {
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
                success: (data) => result = data
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
            })
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
            })
        }
    };

    let app = new Vue({
        el: '#app',
        data: {
            instances: []
        },
        created: function () {
            this.query();
        },
        methods: {
            query: function(){
                let data = Storage.fetch();
                grid.initGrid(document.getElementById(name), data[0], "instances");
                this.instances = data;
            },
            add: function(ins) {
                Storage.add(ins);
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



