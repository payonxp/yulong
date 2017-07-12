/**
 * Created by tpeng on 2017/7/12.
 */
let dbConnector = require('./dbConnector');

let MongooseUtil = {
    Filter: function(obj) {
        delete obj.UpdatedBy;
        delete obj.CreatedBy;
        delete obj.RowPointer;
        delete obj.NoteExistsFlag;
        delete obj.InWorkflow;
        return obj;
    },
    PreProcessor: function (obj) {
        return new Promise((resolve) => {dbConnector.query("select newid()", function(err, id) {
            obj.RowPointer = id;
            obj.CreateDate = Date.now();
            obj.UpdateBy = 'sa';
            obj.CreateDate = 'sa';
            obj.RecordDate = Date.now();
            obj.NoteExistsFlag = 0;
            obj.InWorkflow = 0;
            resolve(obj);
        });
        });

    }
};

module.exports = MongooseUtil;
