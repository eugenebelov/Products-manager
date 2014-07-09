$(function(){
	var Products = {
		init: function() {
			this.url = "./src/fake/data.js";

			this.fetch();
		},
		attachTemplate: function() {
			var template = $.trim($("#products-table-tpl").html()),
				readyTpl = '';

			$.each(this.productsList, function(index, obj) {
				readyTpl += template.replace(/{{title}}/ig, obj.title)
									.replace(/{{sku}}/ig, obj.sku)
									.replace(/{{price}}/ig, obj.price);
			});

			$("#products-table > tbody").append(readyTpl);
		},
		fetch: function() {
			var self = this;

			$.getJSON(this.url, function(data) {
				self.productsList = data.products;
				
				self.attachTemplate();
			});
		}
	};

	Products.init();
});