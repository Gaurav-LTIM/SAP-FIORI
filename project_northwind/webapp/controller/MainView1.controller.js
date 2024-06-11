sap.ui.define([
    'sap/ui/core/Fragment',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel'
], function(Fragment, Controller, JSONModel) {
"use strict";

var PageController = Controller.extend("projectnorthwind.controller.MainView1", {

    onInit: function (oEvent) {
            // set explored app's demo model on this sample
        var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock/supplier.json"));
        oModel.attachRequestCompleted(function() {
            this.byId('edit').setEnabled(true);
        }.bind(this));
        this.getView().setModel(oModel);

        this.getView().bindElement("/SupplierCollection/0");

        this._formFragments = {};

        // Set the initial form to be the display one
        this._showFormFragment("Display");
        
    },

    // onReadEmpData: function(){
    // 	var oModel = this.getOwnerComponent().getModel();
    // 	var oJSONModel = new sap.ui.model.json.JSONModel();
    // 	var oBusyDialog = new sap.m.BusyDialog({
    // 		title: "Loading Data",
    // 		text: "PLZ Wait ....."
    // 	});
    //    oBusyDialog.open();
    // 	oModel.read("/Customers/0",{
    // 		success: function(resp){
    // 			oBusyDialog.close();
    // 			oJSONModel.setData(resp.results);
    // 			this.getView().setModel(oJSONModel,"Emp");
    // 		}.bind(this),
    // 		error: function(err){
    // 			oBusyDialog.close();
    // 		}
    // 	});
    // },

    handleEditPress : function () {

        //Clone the data
        this._oSupplier = Object.assign({}, this.getView().getModel().getData().Customers[0]);
        this._toggleButtonsAndView(true);

    },

    handleCancelPress : function () {

        //Restore the data
        var oModel = this.getView().getModel();
        var oData = oModel.getData();

        oData.SupplierCollection[0] = this._oSupplier;

        oModel.setData(oData);
        this._toggleButtonsAndView(false);

    },

    handleSavePress : function () {

        this._toggleButtonsAndView(false);

    },

    _toggleButtonsAndView : function (bEdit) {
        var oView = this.getView();

        // Show the appropriate action buttons
        oView.byId("edit").setVisible(!bEdit);
        oView.byId("save").setVisible(bEdit);
        oView.byId("cancel").setVisible(bEdit);

        // Set the right form type
        this._showFormFragment(bEdit ? "Change" : "Display");
    },

    _getFormFragment: function (sFragmentName) {
        var pFormFragment = this._formFragments[sFragmentName],
            oView = this.getView();

        if (!pFormFragment) {
            pFormFragment = Fragment.load({
                id: oView.getId(),
                name: "projectnorthwind.view." + sFragmentName
            });
            this._formFragments[sFragmentName] = pFormFragment;
        }

        return pFormFragment;
    },

    _showFormFragment : function (sFragmentName) {
        var oPage = this.byId("page");

        oPage.removeAllContent();
        this._getFormFragment(sFragmentName).then(function(oVBox){
            oPage.insertContent(oVBox);
        });
    }

});

return PageController;

});


