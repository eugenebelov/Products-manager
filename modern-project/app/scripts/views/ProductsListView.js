define([
	'jquery',
	'underscore',
    'backbone',
	'marionette',
    './ProductItemView' 
], function($, _, Backbone, Marionette, ProductItemView) {

return Marionette.CollectionView.extend({
        tagName: "tbody",
        id: "collection-body", 
        childView: ProductItemView
    });
});