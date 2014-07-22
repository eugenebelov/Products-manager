define([
	'jquery',
	'underscore',
    'backbone',
	'marionette',
	'handlebars',
	'../model/ProductsCollection',
  	'./ProductsListView'
], function($, _, Backbone, Marionette, Handlebars, ProductsListView, ProductsCollection) {

    var products = {};

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

            // this.collection.bind("reset", _.bind(this.render, this));
        },

        onRender: function() {
            console.log('main layout: render');

            // if(this.collection.models.length > 0) {
            	// this.showProductsCollectionView();
                // this.show();
            // }
        },

        showProductsCollectionView: function () {
        	// var productsArray = _.clone(this.collection.models[0].attributes.products);
        	// var productList = new ProductsCollection(productsArray);
            // var listView = new ProductsListView({collection: productList});

            // console.log(this.collection);
            // this.RegionOne.show(listView);
        },

        onShow: function() {
            var self = this;
            products = new ProductsCollection(['1', '2', '3']);
            console.log(this.collection);
            if( !this.collection.models )
            {
                this.collection.fetch({
                    success: function (prod) {
                        var productsArray = _.clone(self.collection.models[0].attributes.products);

                        this.collection = new ProductsCollection(productsArray);

                        
                        self.showProductsCollectionView(self);
                    }
                });
            }
        }
    });
});