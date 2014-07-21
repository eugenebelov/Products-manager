define([
	'jquery',
	'underscore',
	'marionette',
	'handlebars',
	'../model/ProductsCollection',
  	'./ProductsListView'
], function($, _, Marionette, Handlebars, ProductsListView, ProductsCollection) {
	return Backbone.Marionette.LayoutView.extend({
        tagName: 'table',
        id: 'products-table',
        className: 'table',
        template: Handlebars.getTemplate("product-list"),
        regions: {
            RegionOne : '#products-table-body'
        },
        initialize: function() {
            // console.log('main layout: initialize', ProductsListView, ProductsCollection);

            this.collection.bind("reset", _.bind(this.render, this));
        },

        onRender: function() {
            // console.log('main layout: initialize', ProductsListView, ProductsCollection);

            if(this.collection.models.length > 0)
            	this.showProductsCollectionView();
        },

        showProductsCollectionView: function () {
        	console.log(this.collection)
        	// var productList = new ProductsCollection(_.clone(this.collection.models[0].attributes.products));
            var listView = new ProductsListView({collection: this.collection});
            this.RegionOne.show(listView);
        },

        onShow: function() {
            // console.log('main layout: initialize', ProductsListView, ProductsCollection);            
        }
    });
});