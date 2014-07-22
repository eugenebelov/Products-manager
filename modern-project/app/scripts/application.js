
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'router',
  'handlebars',
  'model/ProductsCollection',
  'views/ListCompositeView'
  
], function($, _, Backbone, Marionette, Router, Handlebars, ProductsCollection, ListCompositeView){
    
	var app = new Backbone.Marionette.Application();
	var productsCollection = new ProductsCollection();
	
  var productsList = new ListCompositeView({collection:productsCollection});

	// var productsLayout = new Layout({collection: productsCollection});
	// var editView = new EditView(viewOptions);
	// var addView = new AddProductsFormView({collection: productsCollection});
	// var mainButtonBarView = new AddProductsItemView(viewOptions);
	// var exportView = new ExportView(viewOptions);

	app.addRegions({
      productListRegion: "#view",
      exportRegion: "#viewExported"
  });

  app.addInitializer(function(){
      // app.productListRegion.show(productsLayout);

      app.productListRegion.show(productsList);

      productsCollection.fetch({
                    success: function (prod) {
                        var productsArray = _.clone(productsCollection.models[0].attributes);

                        $.each(productsArray, function(index, obj) {
                          productsArray[index] = JSON.stringify(obj);
                        });
                        // console.log("fetch", productsArray);
                        productsCollection.model = productsArray;
                        // productsCollection = new ProductsCollection(productsArray);

                    }
                });
  });

	return window.app = app;
});