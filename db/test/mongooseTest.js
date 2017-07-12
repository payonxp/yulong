/**
 * Created by tpeng on 2017/7/12.
 */
let MongooseUtil = require("../mongooseUtil");

module.exports = function () {
    let obj1 = {
        a: 1,
        b: 2
    };

    MongooseUtil.PreProcessor(obj1).then((obj) => console.log(obj));

    let obj2 = {
        UpdatedBy: 1,
        CreatedBy: 2,
        RowPointer: 3,
        NoteExistsFlag: 4,
        InWorkflow: 5,
        data: 'd'
    };

    console.log(MongooseUtil.Filter(obj2));
};