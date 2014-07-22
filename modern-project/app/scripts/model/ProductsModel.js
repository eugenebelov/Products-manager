define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {

	var ProductsModel = Backbone.Model.extend({
        parse : function(res) { 
            return res.products;
        }
    });

    return ProductsModel;

});