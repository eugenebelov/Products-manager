
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
 
    /* definition for individual item view */
    module.BookItemView = Marionette.ItemView.extend({
        tagName: 'tr',
 
        /* set the template used to display this view */
        template: '#product-list-template',
 
        /* used to show the order in which these method are called */
        initialize: function(){ console.log('BookItemView: initialize >>> ' + this.model.get('title')) },
        onRender: function(){ console.log('BookItemView: onRender >>> ' + this.model.get('title')) },
        onShow: function(){ console.log('BookItemView: onShow >>> ' + this.model.get('title')) }
    });
 
    /* definition for collection view */
    module.BookCollectionView = Marionette.CollectionView.extend({
        tagName: "tbody",
        /* explicitly set the itemview used to display the models in this collection */
        // itemView: module.BookItemView,
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
             
            /* create an array of books using anonymouse objects;
                the objects have the same structure as in the 'defaults'
                attribute of the module.BookModel definition */
            var bookArray = [];

            // bookArray.push({title: 'Wolf',sku: 'Harrison', price: 'Jim'});
            // bookArray.push({title: 'The Theory and Practice of Rivers', sku: 'Snyder', price: 'Gary'});
            // bookArray.push({title: 'Weather Central',sku: 'Kooser', price: 'Ted'});
            // bookArray.push({title: 'Losing Season',sku: 'Ridl', price: 'Jack'});
            // bookArray.push({title: 'Mornings Like This',sku: 'Dillard', price: 'Annie'});
 
            /* create a collection using the array of anonymous objects */
            var bookCollection = new module.BookCollection(bookArray);
            
            bookCollection.fetch({
	            success: function (prod) {
	                bookArray = _.clone(bookCollection.models[0].attributes.products);
	                console.log(bookCollection);
	            }
	        });
 
            /* create new instance of the collection view using the bookCollection */
            var bookCollectionView = new module.BookCollectionView({collection: bookCollection});
 
            /* display the collection view in region 1 */
            this.RegionOne.show(bookCollectionView);
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

