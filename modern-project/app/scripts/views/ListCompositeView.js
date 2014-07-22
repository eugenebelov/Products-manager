define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'handlebars',
	'./ProductItemView',
	'./GetHandlebarsTemplate' 
], function($, _, Backbone, Marionette, Handlebars, ProductItemView, GetHandlebarsTemplate) {
	'use strict';

	return Backbone.Marionette.CompositeView.extend({

		template: Handlebars.getTemplate("product-list"),

		childView: ProductItemView,

		childViewContainer: '#products-table-body'
	});
});