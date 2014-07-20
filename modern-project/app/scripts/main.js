'use strict';

require(['model', 'controller', 'views', 'router'], function(){

    var ProductApp = new Backbone.Marionette.Application();

    var productsCollection = {};
    var Router = {};
    var EventListener = {};
    _.extend(EventListener, Backbone.Events);

    Handlebars.getTemplate = function(name) {
        if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
            $.ajax({
                url : './scripts/templates/' + name + '.hbs',
                datatype: 'text/javascript',
                success : function(response, status, jqXHR) {
                    if (Handlebars.templates === undefined) {
                        Handlebars.templates = {};
                    }
                    Handlebars.templates[name] = Handlebars.compile(response);
                },
                async : false
            });
        }
        return Handlebars.templates[name];
    };

    ProductApp.addRegions({
        productListRegion: "#view",
        exportRegion: "#viewExported"
    });


    ProductApp.ProductsModel = Backbone.Model.extend({
        defaults: {
            title: '',
            sku: '',
            price: ''
        }
    });

    ProductApp.ProductsCollection = Backbone.Collection.extend({
        model: ProductApp.ProductsModel,
        comparator: 'authorLast',
        url: 'scripts/fake/data.json'
    });

    ProductApp.EditProductFormView = Marionette.ItemView.extend({
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

    ProductApp.ExportProducts = Marionette.ItemView.extend({
        el:'#viewExported',
        initialize: function() {
            EventListener.bind('onexport', this.onExportHandler, this);
        },
        onExportHandler: function(event) {
            this.$el.empty()
                    .append($.parseHTML("<b>Parsed</b><br/>"))
                    .append(JSON.stringify(this.collection.toJSON()));
        }
    });

    ProductApp.ProductsItemView = Marionette.ItemView.extend({
        tagName: 'tr',

        template: Handlebars.getTemplate("product-list-item"),

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

        initialize: function(){ 
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },
        remove: function(){ 
            this.$el.remove() 
        },
        render: function(){
            this.$el.html( this.template(this.model.toJSON()) );
            return this;
        }
    });

    ProductApp.ProductsCollectionView = Marionette.CollectionView.extend({
        tagName: "tbody",
        id: "collection-body", 
        childView: ProductApp.ProductsItemView,

        onShow: function(){ 
            console.log("ProductsCollectionView on Show");
            $('#collection-body').contents().unwrap();
        }
    });

    ProductApp.AppLayoutView = Backbone.Marionette.LayoutView.extend({
        tagName: 'table',
        id: 'products-table',
        className: 'table',
        template: Handlebars.getTemplate("product-list"),
        regions: {
            RegionOne : '#products-table-body'
        },
        initialize: function() {
            console.log('main layout: initialize');
        },

        onRender: function() {
            console.log('main layout: onRender');
        },

        showProductsCollectionView: function (context) {
            var productsCollectionView = new ProductApp.ProductsCollectionView({collection: productsCollection});
            context.RegionOne.show(productsCollectionView);
        },
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
                        var exportprod = new ProductApp.ExportProducts({collection:productsCollection});
                        
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

        ProductApp.productListRegion.show(layout);
    });

    $(document).ready(function() { ProductApp.start(); });

});