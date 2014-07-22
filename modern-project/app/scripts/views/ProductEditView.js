define([
	'jquery',
	'underscore',
  'backbone',
	'marionette', 
	'handlebars',
	'router'
], function($, _, Backbone, Marionette, Handlebars, Router) {

return Marionette.ItemView.extend({
        template: Handlebars.getTemplate("product-edit"),
        events: {
            'click .btn.edit-product': 'onEditProduct',
            'click .btn.cancel-edit': 'onCancel'
        },
        initialize: function() {
            $("#view").html(this.el);
            this.render();
        },
        render: function() {
            this.$el.html(this.template(this.options.model.attributes));
            return this;
        },
        onEditProduct:function(event) {
          console.log(router);

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

            var model = this.options.model.set(o);

            router.navigate("home", {trigger: true, replace: true});
        },
        onCancel:function(event) {
            router.navigate("home", {trigger: true, replace: true});
        }
    });

});