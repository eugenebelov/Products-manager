
var ProductApp = new Backbone.Marionette.Application();

ProductApp.addRegions({
	productListRegion: "#view",
	exportRegion: "#viewExported"
});

// var productController = new ProductController();
// productController.AddProductList({region: ProductApp.productListRegion});

ProductApp.module('ProductApp', function(module, App, Backbone, Marionette, $, _) {
	/* definition for book model, with default example of data structure */
    module.BookModel = Backbone.Model.extend({
        defaults: {
            title: '',
            sku: '',
            price: ''
        }
    });
 
    /* definition for book collection */
    module.BookCollection = Backbone.Collection.extend({
         
        /* set model type used for this collection */
        model: module.BookModel,
 
        /* comparator determines how collection is sorted */
        comparator: 'authorLast',

        url: 'scripts/fake/data.json'
    });
 
    module.AddBookItemView = Marionette.ItemView.extend({
        el:'#add-button-bar',
        events: {
            'click .add-product': 'onAddProduct',
            'click .export-json': 'onExport'
        },

        onAddProduct:function(event) {
            console.log("onAdd");
            var prod = new module.BookModel({title:'new prod', sku:'999', price:'1mln'});
            this.collection.add(prod);
        },
        onExport:function(event) {
            console.log("onExport");
        }

    });

    /* definition for individual item view */
    module.BookItemView = Marionette.ItemView.extend({
        tagName: 'tr',
 
        /* set the template used to display this view */
        template: _.template($('#product-list-template').html()),

        events: {
            'click .edit-product': 'onEditProductClick',
            'click .remove-product': 'onRemoveProductClick'
        },

        onEditProductClick: function(event) {
            console.log("edit", this.model.get('sku'));
        },

        onRemoveProductClick: function(event) {
            console.log("remove", event);
            this.model.destroy();
        },

        /* used to show the order in which these method are called */
        initialize: function(){ 
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);

            console.log('BookItemView: initialize >>> ' + this.model.get('title')) 
        },
        onRender: function(){ console.log('BookItemView: onRender >>> ' + this.model.get('title')) },
        onShow: function(){ console.log('BookItemView: onShow >>> ' + this.model.get('title')) },
        remove: function(){ 
            this.$el.remove() 
        },
        render: function(){
            this.$el.html( this.template(this.model.toJSON()));
            return this;
        }
    });
 
    /* definition for collection view */
    module.BookCollectionView = Marionette.CollectionView.extend({
        tagName: "tbody",
        /* explicitly set the itemview used to display the models in this collection */
        childView: module.BookItemView,
 
        initialize: function(){ console.log('BookCollectionView: initialize') },
        onRender: function(){ console.log('BookCollectionView: onRender') },
        onShow: function(){ console.log('BookCollectionView: onShow') }
    });
 
    /* define a view; in this case a 'Layout' */
    module.AppLayoutView = Backbone.Marionette.LayoutView.extend({
         
        /* the auto-generated element which contains this view */
        tagName: 'table',
 
        /* id attribute for the auto-generated container element */
        id: 'products-table',
        className: 'table',
 
        /* reference to the template which will be rendered for this view */
        template: '#product-list-body-template',
 
        /* define the regions within this layout, into which we will load additional views */
        regions: {
            RegionOne : '#products-table-body'
        },
 
        /* called when the view initializes, before it displays */
        initialize: function() {
            console.log('main layout: initialize');
        },
 
        /* called when view renders in the DOM. This is a good place to 
            add nested views, because the views need existing DOM elements
            into which to be rendered. */
        onRender: function() {
            console.log('main layout: onRender');
            var self = this;
            
            var bookCollection = new module.BookCollection();
            bookCollection.fetch({
	            success: function (prod) {
                    var bookArray = _.clone(bookCollection.models[0].attributes.products);
                    bookCollection = new module.BookCollection(bookArray);
	                var bookCollectionView = new module.BookCollectionView({collection: bookCollection});
                    var addprod = new module.AddBookItemView({collection:bookCollection});
                    self.RegionOne.show(bookCollectionView);
	            }
	        });
        },
 
        /* called when the view displays in the UI */
        onShow: function() {
            console.log('main layout: onShow');
        }
    });

	module.addInitializer(function(){
        /* create a new instance of the layout from the module */
        var layout = new module.AppLayoutView();

        /* display the layout in the region defined at the top of this file */
        ProductApp.productListRegion.show(layout);
    });
});

$(document).ready(function() {ProductApp.start();});

