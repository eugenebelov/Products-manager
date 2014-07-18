var Product = Backbone.Model.extend({
	defaults: {
		title: "product",
		sku: "1",
		price: "19.99"
	}

	urlRoot: 'src/scripts/fake/data.json'
})