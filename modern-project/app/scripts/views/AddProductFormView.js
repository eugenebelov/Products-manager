define([
	'jquery',
	'underscore',
	'marionette', 
	'handlebars',
	'router'
], function($, _, Marionette) {

AddProductFormView = Marionette.ItemView.extend({
        template: Handlebars.getTemplate("product-add"),
        events: {
            'click .btn.add-product': 'onCreateProduct',
            'click .btn.cancel-add': 'onCancel'
        },
        initialize: function() {
            $("#view").html(this.el);
            this.render();
        },
        onCreateProduct:function(event) {
            var formData = JSON.stringify(this.$el.find('form').serializeArray());
            var o = {};
            $.each($.parseJSON(formData), function(key, value) {
               if (o[this.name]) {
                   if (!o[this.name].push) {
                       o[this.name] = [o[this.name]];
                   }
                   o[this.name].push(this.value || '');
               } else {
                   o[this.name] = this.value || '';
               }
            });
            var prod = new ProductApp.ProductsModel(o);
            this.collection.add(prod);

            Router.navigate("home", {trigger: true, replace: true});
        },
        onCancel:function(event) {
            Router.navigate("home", {trigger: true, replace: true});
        }
    });
});