var Product = Backbone.Model.extend({
defaults: {
        title: "Title",
        sku: "11",
        price: "199.99"
    }
});

var ProductsCollection = Backbone.Collection.extend({
    model: Product,

    url: 'scripts/fake/data.json'
});
