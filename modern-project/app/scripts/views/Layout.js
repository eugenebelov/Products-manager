define([
	'jquery',
	'underscore',
	'marionette',
	'handlebars',
	'../model/ProductsCollection',
	'./GetTemplateHbs',
  	'./ProductsListView'
], function($, _, Marionette, Handlebars, GetTemplateHbs, ProductsListView, ProductsCollection) {
	return Backbone.Marionette.LayoutView.extend({
        tagName: 'table',
        id: 'products-table',
        className: 'table',
        template: Handlebars.getTemplate("product-list"),
        regions: {
            RegionOne : '#products-table-body'
        },
        initialize: function() {
            // console.log('main layout: initialize');

            this.collection.bind("reset", _.bind(this.render, this));
        },

        onRender: function() {
            // console.log('main layout: onRender', this.collection);

            if(this.collection.models.length > 0)
            	this.showProductsCollectionView();
        },

        showProductsCollectionView: function () {
        	
        	this.productList = new ProductsCollection(_.clone(this.collection.models[0].attributes.products));
            this.RegionOne.show(this.productList);
        },

        onShow: function() {
            
        }
    });
});