define([
	'jquery',
	'underscore',
	'backbone',
	'./ProductsModel'
], function($, _, Backbone, ProductsModel) {

	return Backbone.Collection.extend({
        model: ProductsModel,
        initialize : function(models, options) {},
        url: 'scripts/fake/data.json'
    });
});