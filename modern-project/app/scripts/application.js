
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'router',
  'handlebars',
  'model/ProductsCollection',
  'views/Layout'
  
], function($, _, Backbone, Marionette, Router, Handlebars, ProductsCollection, Layout){
    
	var app = new Backbone.Marionette.Application();
  	var productsCollection = new ProductsCollection();
  	
  	var productsLayout = new Layout({collection: productsCollection});
  	
  	// var editView = new EditView(viewOptions);
  	// var addView = new AddProductsFormView({collection: productsCollection});
  	// var mainButtonBarView = new AddProductsItemView(viewOptions);
  	// var exportView = new ExportView(viewOptions);

  	app.addRegions({
        productListRegion: "#view",
        exportRegion: "#viewExported"
    });

    app.addInitializer(function(){
        app.productListRegion.show(productsLayout);

        productsCollection.fetch({reset:true});
    });

  	return window.app = app;
});