define([
	'jquery',
	'underscore',
	'marionette'
], function($, _, Marionette) {

	return Marionette.AppRouter.extend({
		routes : {
		    'home'  : 'home',
		    'add'   : 'add',
		    'edit/:sku'  : 'edit'
		},
		home : function() {
		    // ProductApp.productListRegion.show(new ProductApp.AppLayoutView());
		    // this.loadView(new ProductApp.ProductsCollectionView({collection: productsCollection}));
		},
		add : function() {
			console.log("router add", this);
		    // this.loadView(new ProductApp.AddProductFormView({collection:productsCollection}));
		},
		edit : function(id) {
		    // this.loadView(new ProductApp.EditProductFormView({collection:productsCollection, model: productsCollection.where({sku:id})[0]}));
		},
		loadView : function(view) {
		    this.view && (this.view.close ? this.view.close() : this.view.remove());
		    this.view = view;
		}
	});
});