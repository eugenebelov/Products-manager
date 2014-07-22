define([
	'jquery',
	'underscore',
	'marionette',
  	'views/ProductEditView',
  	'views/AddProductFormView',
  	'views/ListCompositeView'
], function($, _, Marionette, ProductEditView, AddProductFormView, ListCompositeView) {

	return Marionette.AppRouter.extend({
		routes : {
		    'home'  : 'home',
		    'add'   : 'add',
		    'edit/:sku'  : 'edit'
		},
		home : function() {
		    app.productListRegion.show(new ListCompositeView({
		    	collection: this.options.collection
		    }));
		},
		add : function() {
		    this.loadView(new AddProductFormView({
		    	collection: this.options.collection
		    }));
		},
		edit : function(id) {
			
		    this.loadView(new ProductEditView({
		    					collection: this.options.collection, 
		    					model: this.options.collection.where({sku:id})[0]
		    				}));
		},
		loadView : function(view) {
		    this.view && (this.view.close ? this.view.close() : this.view.remove());
		    this.view = view;
		} 
	});
});