sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History , Filter, FilterOperator, FilterType, MessageBox) {
        "use strict";
 
        return Controller.extend("projectempui.controller.Detail", {
            onInit: function () {
                  var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                  oRouter.getRoute("Detail").attachPatternMatched(this._onRouteMatched, this);
 
        },
 
        _onRouteMatched: function(oEvent){
 
            var sID= oEvent.getParameter("arguments").ID;
            console.log(sID);
 
            var oModel = this.getOwnerComponent().getModel();
            var oJSONModel = new sap.ui.model.json.JSONModel();
            // var oBusyDialog =  new sap.m.BusyDialog({
            //     title:"Loading data",
            //     text: "please wait......"
            // });
            // oBusyDialog.open();
            var ofilter = new sap.ui.model.Filter("ID", "EQ", sID);
            oModel.read("/Employees", {
                urlParameters:{
                    "$expand": "department"
                },
                filters:[ofilter],
                success : function(response){
                    // oBusyDialog.close();
                        oJSONModel.setData(response.results);
                        this.getView().setModel(oJSONModel,"Employees");
                }.bind(this),
                error: function(error){
                    //    oBusyDialog.close();
                }
            });
 
        },
        onNavToDetails: function(oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var sID = oEvent.getSource().getCells()[0].getText();
            oRouter.navTo("Department", {ID: sID});
          },
       
       
        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
         
            if (sPreviousHash !== undefined)
            {
              window.history.go(-1);
            } else
            {
              var oRouter = this.getOwnerComponent().getRouter();
              oRouter.navTo("MainView", {}, true);
            }
         
        },
        onPress: function (oEvent) {
            MessageToast.show(oEvent.getSource().getText());
        },
 
 
 
    onDelete: function(oEvent){
 
            var oTable = this.getView().byId("_IDGenTable1");
            var aSelectedItems = oTable.getSelectedItems();
            var aListData = [];
 
       
        aSelectedItems.forEach(function (oItem) {
            var oContext = oItem.getBindingContext("Employees");
            var oData = oContext.getObject();
            var oListItem = {
                ID: oData.ID,
                createdAt: oData.createdAt,
                createdBy: oData.createdBy,
                ContactTitle: oData.ContactTitle,
                modifiedAt: oData.modifiedAt,
                modifiedBy: oData.modifiedBy,
                name: oData.name,
                email_id: oData.email_id,
                manager: oData.manager,
                department_ID: oData.department_ID
            };
           
            var na = oListItem.ID;
            jQuery.ajax({
                type: "DELETE",
                contentType: "application/json",
                url: "/v2/odata/v4/employee-services/Employees(" + na + ")",
                //data: JSON.stringify(oListItem),
                success: function (data) {
                    MessageBox.success("Data IS DELETE");
                    window.history.go(-1);
                   
                },
                error: function (err) {
                    MessageBox.error("Error Deleting data from local database: " + err.responseText);
                }
            });
           
        });
    },
 
        onEdit:function(oEvent){
           
            if(oEvent.getSource().getText()==="Edit")
           {
                oEvent.getSource().setText("Submit");
                oEvent.getSource().getParent().getParent().getCells()[3].setEditable(true);
                oEvent.getSource().getParent().getParent().getCells()[2].setEditable(true);
            }
            else
            {
 
                oEvent.getSource().setText("Edit");
                oEvent.getSource().getParent().getParent().getCells()[3].setEditable(false);
                oEvent.getSource().getParent().getParent().getCells()[2].setEditable(false);
                var oInput = oEvent.getSource().getParent().getParent().getCells()[3].getValue();
                console.log(oInput);

                
                
 
                var oTable = this.getView().byId("_IDGenTable1");
                var aSelectedItems = oTable.getSelectedItems();
                var aListData = [];
 
       
                aSelectedItems.forEach(function (oItem) {
                var oContext = oItem.getBindingContext("Employees");
                var oData = oContext.getObject();
                console.log(oData.department_ID);
                var oListItem = {
                    ID: oData.ID,
                    createdAt: oData.createdAt,
                    createdBy: oData.createdBy,
                    ContactTitle: oData.ContactTitle,
                    modifiedAt: oData.modifiedAt,
                    modifiedBy: oData.modifiedBy,
                    name: oData.name,
                    email_id: oData.email_id,
                    manager: oData.manager,
                    department_ID: oData.department_ID
                };
           
                var na = oListItem.ID;
 
                jQuery.ajax({
                    type: "PUT",
                    contentType: "application/json",
                    url: "/v2/odata/v4/employee-services/Employees(" + na + ")",
                    data: JSON.stringify(oListItem),
                    success: function (data) {
                        MessageBox.success("Data Updated successfully!");
                        window.location.reload();
                    },
                    error: function (err) {
                        MessageBox.error("Error Updating data: " + err.responseText);
                    }
                });
           
           
                });   
            }
        }

                    // var oTable = this.getView().byId("_IDGenTable1");
                // var aSelectedItems = oTable.getSelectedItems();
                // var aListData = [];
 
               
                // aSelectedItems.forEach(function (oItem) {
                //     var oContext = oItem.getBindingContext("Employees");
                //     var oData = oContext.getObject();
                //     var oListItem = {
                //     ID: oData.ID,
                //     createdAt: oData.createdAt,
                //     createdBy: oData.createdBy,
                //     ContactTitle: oData.ContactTitle,
                //     modifiedAt: oData.modifiedAt,
                //     modifiedBy: oData.modifiedBy,
                //     name: oData.name,
                //     email_id: oData.email_id,
                //     manager: oInput
                //     };
 
                //     var na = oListItem.ID;
                //     co
                //     console.log(oListItem.manager);
 
                //     aListData.push(oListItem);
                //     jQuery.ajax({
                //         type: "PUT",
                //         contentType: "application/json",
                //         url: "/v2/odata/v4/employee-services/Employees(" + na + ")",
                //         data: JSON.stringify(oListItem),
                //         success: function (data) {
                //             MessageBox.success("Data Updated successfully!");
                //         },
                //         error: function (err) {
                //             MessageBox.error("Error Updating data: " + err.responseText);
                //         }
                //     });
                // });
           
            // var that= this;
            // var oModel = this.getOwnerComponent().getModel();
            // oModel.setUseBatch(false);
            // if(oEvent.getSource().getText()==="edit")
            //  {
            //     oEvent.getSource().setText("Submit");
            //     oEvent.getSource().getParent().getParent().getCells()[3].setEditable(true);
            //   }
            // else
            // {
            //     oEvent.getSource().setText("Edit");
            //     oEvent.getSource().getParent().getParent().getCells()[3].setEditable(false);
            //         var oInput = oEvent.getSource().getParent().getParent().getCells()[3].getValue();
            //         //var oInput = oEvent.getSource().getCells()[3].getText();
            //         console.log(oInput);
            //         // var oData = oEvent.getSource().getBindingContext().getObject();
            //         //console.log(oData);
 
            //         var oId = oEvent.getSource().getParent().getParent().getCells()[0].getValue();
            //         //var oId = oEvent.getSource().getCells()[0].getText()
            //         //var oId= oEvent.getParameter("arguments").ID;
            //         //var oId = "befe5c31-7664-48fa-b648-f5587c18047e";
            //          console.log(oId);
 
            //          oModel.update("/Employees("+oId+")",{manager:oInput},
            //          {success: function (odata){
            //             console.log("success");
            //          }, error: function(oError){
            //             console.log(oError);
            //          }})
               
            //         //  oEvent.getSource().setText("Edit");
            //         //  oEvent.getSource().getParent().getParent().getCells()[3].setEditable(false);
            //         //  var oInput = oEvent.getSource().getParent().getParent().getCells()[3].getValue();
            //         //  var oId = oEvent.getSource().getBindingContext().getProperty("ID");
            //         //  oModel.update("/Employees("+oId+")",{manager:oInput}, {success: function (odata){
            //         //     that._onRouteMatched();
            //         //  }, error: function(oError){
            //         //     console.log(oError);
            //         //  }})
            // }
 
    });
});