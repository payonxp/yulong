/**
 * Created by morroc on 2017/7/10.
 */
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    }
});

requirejs(['app/grid'], function(grid) {
    let url = '/instance';

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
        save: function(tasks) {
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(tasks),
                complete: (msg) => console.log(msg)
            })
        },
    };

    let app = new Vue({
        el: '#app',
        data: {
            objs: []
        },
        created: function () {
            this.query();
        },
        methods: {
            query: function(){
                let data = Storage.fetch();
                grid.initGrid(document.getElementById("app"), data[0]);
                this.objs = data;
            },
        }
    });
});



