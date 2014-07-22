define([
	'jquery',
	'underscore',
    'backbone',
	'marionette', 
	'handlebars',
	'router',
	'./GetTemplateHbs'
], function($, _, Backbone, Marionette, Handlebars, Router, GetTemplateHbs) {

	return Backbone.Marionette.ItemView.extend({
        tagName: 'tr',

        template: Handlebars.getTemplate("product-list-item"),

        events: {
            'click .edit-product': 'onEditProductClick',
            'click .remove-product': 'onRemoveProductClick'
        },

        onEditProductClick: function(event) {
        	router.navigate("edit/"+this.model.get('sku'), {trigger: true, replace: true});
        },

        onRemoveProductClick: function(event) {
            this.model.destroy();
        },

        initialize: function(){ 
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },
        remove: function(){ 
            this.$el.remove() 
        },
        render: function(){
            this.$el.html( this.template(this.model.toJSON()) );
            return this;
        }
    });
});