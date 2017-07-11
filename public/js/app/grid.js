/**
 * Created by morroc on 2017/7/10.
 */
define( function() {
    return {
        initGrid: function (table, obj, collection) {                // generate vue template for table
            if (obj === null || table === null) {
                return;
            }

            let thead = document.createElement("thead"); // append header
            let header = document.createElement("tr");
            let tbody = document.createElement("tbody"); // append data
            let grid = document.createElement("tr");
            grid.setAttribute("v-for", "obj in " + collection);
            // loop obj's keys & filter those start with '_' like '_id', '__v'
            Object.keys(obj).filter((o) => !o.startsWith('_')).forEach((key) => {
                let tdh = document.createElement("th");
                tdh.innerText = key;
                header.appendChild(tdh);
                let td = document.createElement("td");
                td.innerText = "{{obj." + key + "}}";
                grid.appendChild(td);
            });

            thead.appendChild(header);
            tbody.appendChild(grid);

            table.appendChild(thead);
            table.appendChild(tbody);
        }
    }
});