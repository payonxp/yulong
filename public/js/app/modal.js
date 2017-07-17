/**
 * Created by tpeng on 2017/7/17.
 */
define( function () {
   return {
       initModal: function (modal, obj) {
           if (obj === null || modal === null) {
               return;
           }

           Object.keys(obj).filter((o) => !o.startsWith('_')).forEach((key) => {
                let div = document.createElement("div");
                let label = document.createElement("label");
                label.innerText = key;
                label.className = "modal-label";
                let input = document.createElement("input");
                input.setAttribute("type", "text");
                input.setAttribute("v-model", "current."+key);

                div.appendChild(label);
                div.appendChild(input);

                modal.appendChild(div);
           });
       }
   }
});