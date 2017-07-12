/**
 * Created by tpeng on 2017/7/12.
 */
let MongooseUtil = {
    Filter: function(obj) {
            delete obj.UpdatedBy;
            delete obj.CreatedBy;
            delete obj.RowPointer;
            delete obj.NoteExistsFlag;
            delete obj.InWorkflow;
            return obj;
    }
    ,
    // TODO: Mongoose PreProcessor
    PreProcessor: function (obj) {
        return obj;
    }
};


module.exports = MongooseUtil;
