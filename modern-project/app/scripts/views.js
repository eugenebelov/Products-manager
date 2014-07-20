var AppLayoutView = Backbone.Marionette.LayoutView.extend({
  template: "#product-list-body",

  regions: {
    content: "#products-table-body"
  }
});

var layoutView = new AppLayoutView();
layoutView.render();


var ProductListBodyView = Backbone.Marionette.ItemView.extend({
    tagName: 'table',
    className: 'table',
    template: "#product-list-body"
});

var ProductListView = Backbone.Marionette.ItemView.extend({
    tagName: 'tr',
    template: "#product-list"
});

var ProductsCollectionView = Backbone.Marionette.CollectionView.extend({
    childView: AppLayoutView
});