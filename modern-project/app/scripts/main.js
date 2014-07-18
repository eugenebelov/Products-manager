ProductManagerApp = new Backbone.Marionette.Application();



// ProductApp = new Backbone.Marionette.Application();

// ProductApp.addRegions({
// 	mainRegion: "#view",
// 	listItemsRegion: "#products-table-body"
// });

// Product = Backbone.Model.extend({
// 	title: 'test-title',
// 	sku: '1',
// 	price: '19.99'
// });

// ProductsCollection = Backbone.Collection.extend({
// 	model: Product
// });

// ProductItemView = Backbone.Marionette.ItemView.extend({
// 	tagName: 'tr',
// 	id: 'item-row',
// 	template: '#product-list-item-tpl'
// });

// ProductsView = Backbone.Marionette.CompositeView.extend({
//   tagName: "table",
//   id: "products-table",
//   className: "table",
//   template: '#product-list-tpl',
//   itemView: ProductItemView,
 
//   appendHtml: function(collectionView, itemView) {
//     collectionView.$("tbody").append(itemView.el);
//   }
// });

// ProductApp.addInitializer(function(options){
//   var productsView = new ProductsView({
//     collection: options.prod
//   });

//   ProductApp.mainRegion.show(productsView);
// });

// $(document).ready(function(){
//   var products = new ProductsCollection([
//     { title: 'P1', sku:'1', price:'19.99' },
//     // { title: 'P2', sku:'2', price:'19.99' },
//     // { title: 'P3', sku:'3', price:'19.99' }
//   ]);
 
//   ProductApp.start({prod: products});
// });