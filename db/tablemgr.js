let sqlserver_api = require('./sqlserverapi');
let tableMgr = {};

tableMgr["Instance"] = sqlserver_api.model("Instance", "[dbo].[T_INSTANCE]", "NAME");
tableMgr["Storage"] = sqlserver_api.model("Storage", "[dbo].[T_STORAGE]", "NAME");
tableMgr["Technology"] = sqlserver_api.model("Technology", "[dbo].[T_TECHNOLOGY]", "NAME");
tableMgr["Product"] = sqlserver_api.model("Product", "[dbo].[T_PRODUCT]", "NAME");
tableMgr["DataConnection"] = sqlserver_api.model("DataConnection", "[dbo].[T_DATA_CONNECTION]", "NAME");
tableMgr["Implementation"] = sqlserver_api.model("Implementation", "[dbo].[T_IMPLEMENTATION]", "NAME");
tableMgr["Metadata"] = sqlserver_api.model("Metadata", "[dbo].[T_METADATA]", "NAME");

tableMgr.Instance.setupSubTable("T_INSTANCE_CACHE", tableMgr.Metadata, "INSTANCE", "METADATA");
tableMgr.Instance.setupSubTable("T_INSTANCE_DATA_SOURCE", tableMgr.DataConnection, "INSTANCE", "DATA_CONNECTION");
tableMgr.Instance.setupSubTable("T_INSTANCE_REPOSITORY", tableMgr.Storage, "INSTANCE", "CODE_BASE");

module.exports = tableMgr;