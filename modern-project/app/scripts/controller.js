var ProductController = Backbone.Marionette.Controller.extend({
	initialize: function(options) {
		var self = this;

		// Hook up the add book event
        ProductApp.on("productAdd", function (book) {
            self.AddBook(book);
        });

        // Hook up the delete book event
        ProductApp.on("productDelete", function (book) {
            self.DeleteBook(book);
        });

        // Hook up the edit book event
        ProductApp.on("productEdit", function (book) {
            self.UpdateBook(book);
        });	
	},

	AddProductList: function (options) {
        var self = this;
        this.collection = new ProductsCollection();
        this.collection.fetch({
            success: function (prod) {
                var productsView = new ProductsCollectionView({ collection: self.collection });
                options.region.show(productsView);
            }
        });
    }
})