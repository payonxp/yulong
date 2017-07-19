/**
 * Created by morroc on 2017/7/10.
 */
define( function() {
    return {
        /*
        * @param {DOM Object} table node
        * @param {Object} data object
        * @param {String} vue data key
        * */
        initGrid: function (table, obj, collection) {                // generate vue template for table
            if (obj === null || table === null) {
                return;
            }

            let thead = document.createElement("thead"); // append header
            let header = document.createElement("tr");
            let tbody = document.createElement("tbody"); // append data
            let grid = document.createElement("tr");
            grid.setAttribute("v-for", "obj in " + collection);

            let tfilter = document.createElement("tr");

            // loop obj's keys & filter those start with '_' like '_id', '__v'
            Object.keys(obj).filter((o) => !o.startsWith('_')).forEach((key) => {
                let filter = document.createElement("th");
                let filter_input = document.createElement("input");
                filter_input.setAttribute("type", "text");
                filter_input.setAttribute("v-model", "Filter."+key);
                filter_input.setAttribute("v-on:blur","$emit('filter', Filter)");
                filter_input.setAttribute("placeholder", "Search...");
                filter_input.className = "filter-input";
                filter.appendChild(filter_input);
                tfilter.appendChild(filter);

                let tdh = document.createElement("th");
                tdh.innerText = key;
                header.appendChild(tdh);
                let td = document.createElement("td");
                td.setAttribute("v-on:click", "showModal=true;current=obj;cache(obj)");
                td.innerText = "{{obj." + key + "}}";
                grid.appendChild(td);
            });

            let plus = document.createElement("th");
            plus.innerHTML = "<button class='btn add-btn' v-on:click='showAdd=true;current={}'>+</button>";
            header.appendChild(plus);

            thead.appendChild(tfilter);
            thead.appendChild(header);
            tbody.appendChild(grid);

            table.appendChild(thead);
            table.appendChild(tbody);
        }
    }
});