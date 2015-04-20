/**
 * Basic Library JavaScript
 *
 * @module BL
 */
var BL = window.BL || {};

BL.namespace = function(name) {
	var arr = name.split("."),
		obj = BL;

	if (arr[0] === "BL") {
		arr.splice(0, 1);
	}

	for (var i = 0; i < arr.length; i++) {
		if (typeof obj[arr[i]] !== "object") {
			obj[arr[i]] = {};
		}
		obj = obj[arr[i]];
	}
	return obj;
};

BL.namespace("BL.Util");

BL.namespace("BL.Com");