define([
	'jquery',
	'underscore',
	'backbone',
	'./ProductsModel'
], function($, _, Backbone, ProductsModel) {

	var ProductsCollection = Backbone.Collection.extend({
        model: ProductsModel,
        initialize : function(models, options) {},
        url: 'scripts/fake/data.json'
    });

	return ProductsCollection;
});