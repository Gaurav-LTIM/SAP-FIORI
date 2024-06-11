/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"project_emp_ui/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
