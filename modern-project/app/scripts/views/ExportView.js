define([
	'jquery',
	'underscore',
	'marionette', 
	'handlebars',
	'router',
  	'model/ProductsModel'
], function($, _, Marionette, Handlebars, Router, ProductsModel) {

	return Marionette.ItemView.extend({
        el:'#viewExported',
        initialize: function() {
            this.options.listener.bind('onexport', this.onExportHandler, this);
        },
        onExportHandler: function(event) {
            this.$el.empty()
                    .append($.parseHTML("<b>Parsed</b><br/>"))
                    .append(JSON.stringify(this.collection.toJSON()));
        }
    });
});