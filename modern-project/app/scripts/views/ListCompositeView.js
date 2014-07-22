define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'handlebars',
	'./ProductItemView' 
], function($, _, Backbone, Marionette, Handlebars, ProductItemView) {
	'use strict';

	return Backbone.Marionette.CompositeView.extend({

		template: Handlebars.getTemplate("product-list"),

		childView: ProductItemView,

		childViewContainer: '#products-table-body',

		initialize: function () {
			// this.listenTo(this.collection, 'all', this.render, this);
			// this.collection.bind("reset", _.bind(this.render, this));
		}
	});
});