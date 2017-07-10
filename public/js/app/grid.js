/**
 * Created by morroc on 2017/7/10.
 */
define( function() {
    return {
        initGrid: function (parent, obj) {
            if (obj === null) {
                return;
            }

            let table = document.createElement("table");
            let header = document.createElement("tr"); // append header
            Object.keys(obj).filter((o) => !o.startsWith('_')).forEach((key) => {
                let td = document.createElement("td");
                td.innerText = key;
                header.appendChild(td);
            });
            table.appendChild(header);

            let grid = document.createElement("tr"); // append data
            grid.setAttribute("v-for", "obj in objs");
            Object.keys(obj).filter((o) => !o.startsWith('_')).forEach((key) => {
                let td = document.createElement("td");
                td.innerText = "{{obj." + key + "}}";
                console.log(obj[key]);
                grid.appendChild(td);
            });
            table.appendChild(grid);

            parent.appendChild(table);
        }
    }
});