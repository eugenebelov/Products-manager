define([
	'jquery',
	'underscore',
    'backbone',
	'marionette',
    './ProductItemView' 
], function($, _, Backbone, Marionette, ProductItemView) {

return Backbone.Marionette.CollectionView.extend({
        tagName: "tbody",
        id: "collection-body", 
        childView: ProductItemView,

        onShow: function(){ 
            console.log("ProductsCollectionView on Show");
            // $('#collection-body').contents().unwrap();
        }
    });
});