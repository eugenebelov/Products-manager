define([
	'jquery',
	'underscore',
	'marionette', 
	'handlebars',
	'router',
	'views/ProductItemView'
], function($, _, Marionette, ProductItemView) {

	return Marionette.CollectionView.extend({
        tagName: "tbody",
        id: "collection-body", 
        childView: ProductItemView,

        onShow: function(){ 
            console.log("ProductsCollectionView on Show");

            $('#collection-body').contents().unwrap();
        }
    });
});