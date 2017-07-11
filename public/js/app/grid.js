/**
 * Created by morroc on 2017/7/10.
 */
define( function() {
    return {
        initGrid: function (parent, obj, id) {
            if (obj === null) {
                return;
            }
            let table = document.createElement("table");
            table.setAttribute("id", id);
            let header = document.createElement("tr"); // append header
            let grid = document.createElement("tr"); // append data
            grid.setAttribute("v-for", "obj in objs");
            Object.keys(obj).filter((o) => !o.startsWith('_')).forEach((key) => {
                let tdh = document.createElement("td");
                tdh.innerText = key;
                header.appendChild(tdh);
                let td = document.createElement("td");
                td.innerText = "{{obj." + key + "}}";
                grid.appendChild(td);
            });

            table.appendChild(header);
            table.appendChild(grid);

            parent.appendChild(table);
        }
    }
});