define([
	'jquery',
	'underscore',
	'backbone',
	'./ProductsModel'
], function($, _, Backbone, ProductsModel) {

return Backbone.Collection.extend({
        model: ProductsModel,
        url: 'scripts/fake/data.json'
    });
});