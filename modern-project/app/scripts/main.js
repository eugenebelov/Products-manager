
var ProductApp = new Backbone.Marionette.Application();

var bookCollection = {};
var Router = {};
var EventListener = {};
_.extend(EventListener, Backbone.Events);

ProductApp.addRegions({
	productListRegion: "#view",
	exportRegion: "#viewExported"
});

// ProductApp.module('ProductApp', function(module, App, Backbone, Marionette, $, _) {
    ProductApp.BookModel = Backbone.Model.extend({
        defaults: {
            title: '',
            sku: '',
            price: ''
        }
    });

    ProductApp.ProductsRouter = Backbone.Router.extend({
        routes : {
            'home'  : 'home',
            'add'   : 'add',
            'edit'  : 'edit'
        },
        home : function() {
            this.loadView(new ProductApp.BookCollectionView({collection:bookCollection}));
            console.log("router - home");
        },
        add : function() {
            this.loadView(new ProductApp.AddProductFormView({collection:bookCollection}));
            // console.log("router - add");
        },
        edit : function() {
            // this.loadView(new UsersView());
            console.log("router - edit");
        },
        loadView : function(view) {
            this.view && (this.view.close ? this.view.close() : this.view.remove());
            this.view = view;
        }
    });
 
    ProductApp.BookCollection = Backbone.Collection.extend({
         
        /* set model type used for this collection */
        model: ProductApp.BookModel,
 
        /* comparator determines how collection is sorted */
        comparator: 'authorLast',

        url: 'scripts/fake/data.json'
    });
 
    ProductApp.AddProductFormView = Marionette.ItemView.extend({
        template: _.template($('#product-add-item').html()),
        events: {
            'click .btn.add-product': 'onCreateProduct',
            'click .btn.cancel-add': 'onCancel'
        },
        initialize: function() {
            $("#view").html(this.el);
            this.render();
        },
        onCreateProduct:function(event) {
            var prod = new ProductApp.BookModel({title:'new prod', sku:'999', price:'1mln'});
            this.collection.add(prod);

            Router.navigate("home", {trigger: true, replace: true});
        },
        onCancel:function(event) {
            Router.navigate("home", {trigger: true, replace: true});
        }
    });

    ProductApp.AddBookItemView = Marionette.ItemView.extend({
        el:'#add-button-bar',
        events: {
            'click .btn.show-add-product': 'onAddProduct',
            'click .btn.show-export-json': 'onExport'
        },

        onAddProduct:function(event) {
            Router.navigate("add", {trigger: true, replace: true});

            // var prod = new ProductApp.BookModel({title:'new prod', sku:'999', price:'1mln'});
            // this.collection.add(prod);
        },
        onExport:function(event) {
            console.log("onExport");
            EventListener.trigger('onexport');
        }
    });

    ProductApp.ExportBooks = Marionette.ItemView.extend({
        el:'#viewExported',
        initialize: function() {
            EventListener.bind('onexport', this.onExportHandler, this);
        },
        onExportHandler: function(event) {
            console.log("Export part triggered", this.collection.toJSON());
        }
    });

    ProductApp.BookItemView = Marionette.ItemView.extend({
        tagName: 'tr',
 
        /* set the template used to display this view */
        template: _.template($('#product-list-template').html()),

        events: {
            'click .edit-product': 'onEditProductClick',
            'click .remove-product': 'onRemoveProductClick'
        },

        onEditProductClick: function(event) {
            Router.navigate("edit", {trigger: true, replace: true});
            // console.log("edit", this.model.get('sku'));
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
        // onRender: function(){ console.log('BookItemView: onRender >>> ' + this.model.get('title')) },
        // onShow: function(){ console.log('BookItemView: onShow >>> ' + this.model.get('title')) },
        remove: function(){ 
            this.$el.remove() 
        },
        render: function(){
            this.$el.html( this.template(this.model.toJSON()));
            return this;
        }
    });
 
    ProductApp.BookCollectionView = Marionette.CollectionView.extend({
        tagName: "tbody",
        id: "collection-body",
        /* explicitly set the itemview used to display the models in this collection */
        childView: ProductApp.BookItemView,
 
        // initialize: function(){ },
        // onRender: function(){ },
        onShow: function(){ 
            $('#collection-body').contents().unwrap();
        }
    });
 
    ProductApp.AppLayoutView = Backbone.Marionette.LayoutView.extend({
         
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
            
            bookCollection = new ProductApp.BookCollection();
            bookCollection.fetch({
	            success: function (prod) {
                    var bookArray = _.clone(bookCollection.models[0].attributes.products);
                    bookCollection = new ProductApp.BookCollection(bookArray);
	                var bookCollectionView = new ProductApp.BookCollectionView({collection: bookCollection});
                    var addprod = new ProductApp.AddBookItemView({collection:bookCollection});
                    var exportprod = new ProductApp.ExportBooks({collection:bookCollection});
                    self.RegionOne.show(bookCollectionView);
	            }
	        });
        },
 
        /* called when the view displays in the UI */
        onShow: function() {
            console.log('main layout: onShow');
        }
    });

	ProductApp.addInitializer(function(){
        Router = new ProductApp.ProductsRouter();
        var layout = new ProductApp.AppLayoutView();

        Backbone.history.start();

        /* display the layout in the region defined at the top of this file */
        ProductApp.productListRegion.show(layout);
    });
// });

$(document).ready(function() { ProductApp.start(); });

