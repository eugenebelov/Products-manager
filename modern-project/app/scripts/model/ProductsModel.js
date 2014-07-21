define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {

return Backbone.Model.extend({
        defaults: {
            title: '',
            sku: '',
            price: ''
        }
    });

});