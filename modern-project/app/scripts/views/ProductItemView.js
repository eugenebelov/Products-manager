define([
	'jquery',
	'underscore',
	'marionette', 
	'handlebars',
	'router',
	'./GetTemplateHbs'
], function($, _, Marionette, Handlebars, GetTemplateHbs) {

	return Marionette.ItemView.extend({
        tagName: 'tr',

        template: Handlebars.getTemplate("product-list-item"),

        events: {
            'click .edit-product': 'onEditProductClick',
            'click .remove-product': 'onRemoveProductClick'
        },

        onRender: function() {
            console.log("onRender");
        },

        onEditProductClick: function(event) {
        	console.log("edit", this.model.get('sku'))
            // Router.navigate("edit/"+this.model.get('sku'), {trigger: true, replace: true});
        },

        onRemoveProductClick: function(event) {
            console.log("remove", event);
            this.model.destroy();
        },

        initialize: function(){ 
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);

            console.log("init");
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