define( function (url) {
   return {
       fetch: function(obj) {
           let result;
           $.ajax({
               type: 'GET',
               url: url,
               dataType: 'json',
               async: false,
               data: obj,
               success: (data) => {
                   result = data.data;
               }
           });
           return result;
       },
       add: function(obj) {
           $.ajax({
               type: 'POST',
               url: url + "/add",
               dataType: 'json',
               contentType: 'application/json',
               data: JSON.stringify(obj),
               complete: (msg) => {
                   console.log(msg);
                   if (msg.responseJSON.msg === "success"){
                       alert("Add row success.");
                       app.$emit("Success", obj);
                   }
               }
           });
       },
       update: function(obj, oldObj) {
           let data = {
               newObj: obj,
               oldObj: oldObj
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
                       alert("Update row success.");
                       app.$emit("Success", obj);
                   }
               }
           });
       },
       del: function(obj) {
           $.ajax({
               type: 'POST',
               url: url + "/delete",
               dataType: 'json',
               contentType: 'application/json',
               data: JSON.stringify(obj),
               complete: (msg) => {
                   console.log(msg);
                   if (msg.responseJSON.msg === "success") {
                       alert("Delete row success.");
                       app.$emit("Success", obj);
                   }
               }
           });
       }
   }
});