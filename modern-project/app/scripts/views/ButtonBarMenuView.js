define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'handlebars',
	'router'
], function($, _, Backbone, Marionette, Handlebars, Router) {
	'use strict';

return Marionette.ItemView.extend({
        el:'#add-button-bar',
        events: {
            'click .btn.show-add-product': 'onAddProduct',
            'click .btn.show-export-json': 'onExport'
        },

        onAddProduct:function(event) {
            router.navigate("add", {trigger: true, replace: true});
        },
        onExport:function(event) {
        	this.options.listener.trigger('onexport');
        }
    });
});