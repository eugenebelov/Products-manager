
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'router',
  'handlebars',
  'fake/data',
  'model/ProductsCollection',
  'views/ListCompositeView',
  'views/ButtonBarMenuView',
  'views/ExportView'
  
], function($, _, Backbone, Marionette, Router, Handlebars, dataObject, ProductsCollection, 
            ListCompositeView, ButtonBarMenuView, ExportView){
    
	var app = new Backbone.Marionette.Application();
	this.productsCollection = new ProductsCollection(dataObject);
	
  this.EventListener = {};
  _.extend(this.EventListener, Backbone.Events);

  this.productsList = new ListCompositeView({collection: productsCollection});
  this.mainButtonBarView = new ButtonBarMenuView({listener: this.EventListener});
  this.exportView = new ExportView({listener: this.EventListener, collection: productsCollection});
  this.router = new Router({collection: productsCollection});

	app.addRegions({
      productListRegion: "#view",
      exportRegion: "#viewExported"
  });

  app.addInitializer(function(){
      app.productListRegion.show(productsList);
  });

	return window.app = app;
});