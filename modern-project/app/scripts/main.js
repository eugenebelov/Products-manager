
var ProductApp = new Backbone.Marionette.Application();

var productsCollection = {};
var Router = {};
var EventListener = {};
_.extend(EventListener, Backbone.Events);

ProductApp.addRegions({
	productListRegion: "#view",
	exportRegion: "#viewExported"
});

// ProductApp.module('ProductApp', function(module, App, Backbone, Marionette, $, _) {
    ProductApp.ProductsModel = Backbone.Model.extend({
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
            'edit/:sku'  : 'edit'
        },
        home : function() {
            ProductApp.productListRegion.show(new ProductApp.AppLayoutView());
            // this.loadView(new ProductApp.ProductsCollectionView({collection: productsCollection}));
        },
        add : function() {
            this.loadView(new ProductApp.AddProductFormView({collection:productsCollection}));
        },
        edit : function(id) {
            this.loadView(new ProductApp.EditProductFormView({collection:productsCollection, model: productsCollection.where({sku:id})[0]}));
        },
        loadView : function(view) {
            this.view && (this.view.close ? this.view.close() : this.view.remove());
            this.view = view;
        }
    });
 
    ProductApp.ProductsCollection = Backbone.Collection.extend({
         
        /* set model type used for this collection */
        model: ProductApp.ProductsModel,
 
        /* comparator determines how collection is sorted */
        comparator: 'authorLast',

        url: 'scripts/fake/data.json'
    });
 
    ProductApp.EditProductFormView = Marionette.ItemView.extend({
        template: _.template($('#product-edit-item').html()),
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

            Router.navigate("home", {trigger: true, replace: true});
        },
        onCancel:function(event) {
            Router.navigate("home", {trigger: true, replace: true});
        }
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

    ProductApp.AddProductsItemView = Marionette.ItemView.extend({
        el:'#add-button-bar',
        events: {
            'click .btn.show-add-product': 'onAddProduct',
            'click .btn.show-export-json': 'onExport'
        },

        onAddProduct:function(event) {
            Router.navigate("add", {trigger: true, replace: true});
        },
        onExport:function(event) {
            EventListener.trigger('onexport');
        }
    });

    ProductApp.ExportProductss = Marionette.ItemView.extend({
        el:'#viewExported',
        initialize: function() {
            EventListener.bind('onexport', this.onExportHandler, this);
        },
        onExportHandler: function(event) {
            console.log("Export part triggered", this.collection.toJSON());
            this.$el.empty()
                    .append($.parseHTML("<b>Parsed</b><br/>"))
                    .append(JSON.stringify(this.collection.toJSON()));
        }
    });

    ProductApp.ProductsItemView = Marionette.ItemView.extend({
        tagName: 'tr',
 
        /* set the template used to display this view */
        template: _.template($('#product-list-template').html()),

        events: {
            'click .edit-product': 'onEditProductClick',
            'click .remove-product': 'onRemoveProductClick'
        },

        onEditProductClick: function(event) {
            Router.navigate("edit/"+this.model.get('sku'), {trigger: true, replace: true});
        },

        onRemoveProductClick: function(event) {
            console.log("remove", event);
            this.model.destroy();
        },

        /* used to show the order in which these method are called */
        initialize: function(){ 
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },
        // onRender: function(){ console.log('ProductsItemView: onRender >>> ' + this.model.get('title')) },
        // onShow: function(){ console.log('ProductsItemView: onShow >>> ' + this.model.get('title')) },
        remove: function(){ 
            this.$el.remove() 
        },
        render: function(){
            this.$el.html( this.template(this.model.toJSON()));
            return this;
        }
    });
 
    ProductApp.ProductsCollectionView = Marionette.CollectionView.extend({
        tagName: "tbody",
        id: "collection-body",
        /* explicitly set the itemview used to display the models in this collection */
        childView: ProductApp.ProductsItemView,
 
        // initialize: function(){ },
        // onRender: function(){ },
        onShow: function(){ 
            console.log("ProductsCollectionView on Show");
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
        },

        showProductsCollectionView: function (context) {
            var productsCollectionView = new ProductApp.ProductsCollectionView({collection: productsCollection});
            context.RegionOne.show(productsCollectionView);
        },

        /* called when the view displays in the UI */
        onShow: function() {
            console.log('main layout: onShow');

            var self = this;
            
            if( !productsCollection.models )
            {
                productsCollection = new ProductApp.ProductsCollection();
                productsCollection.fetch({
                    success: function (prod) {
                        var productsArray = _.clone(productsCollection.models[0].attributes.products);
                        productsCollection = new ProductApp.ProductsCollection(productsArray);

                        var addprod = new ProductApp.AddProductsItemView({collection:productsCollection});
                        var exportprod = new ProductApp.ExportProductss({collection:productsCollection});
                        
                        self.showProductsCollectionView(self);
                    }
                });
            } 
            else
            {
                this.showProductsCollectionView(this);
            }
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
