ProductApp = new Backbone.Marionette.Application();

ProductApp.addRegions({
	mainRegion: "#view"
});

Product = Backbone.Model.extend({
	title: 'test-title',
	sku: '1',
	price: '19.99'
});

ProductsCollection = Backbone.Collection.extend({
	model: Product
});

ProductItemView = Backbone.Marionette.ItemView.extend({
	template: '<tr>
				  <td><%= title %></td>
				  <td><%= sku %></td>
				  <td><%= price %></td>
				  <td class="actions">
				      <div class="btn btn-primary" onclick="productModel.onEdit(<%= sku %>)">edit</div>
				      <div class="btn btn-warning" onclick="productModel.onRemove(<%= sku %>)">delete</div>
				  </td>
				</tr>',
	tagName: 'tbody'
});

ProductsView = Backbone.Marionette.CompositeView.extend({
  tagName: "table",
  id: "products-table",
  className: "table",
  template: '<table>
			  <thead>
			    <tr>
			      <th>Title</th>
			      <th>Sku</th>
			      <th>Price</th>
			      <th>Actions</th>
			    </tr>
			  </thead>
			  <tbody id="products-table-body">
			    {{items}}
			  </tbody>
			</table>',
  itemView: ProductItemView,
 
  appendHtml: function(collectionView, itemView) {
    collectionView.$("tbody").append(itemView.el);
  }
});

ProductApp.addInitializer(function(options){
  var productsView = new ProductsView({
    collection: options.prod
  });

  ProductApp.mainRegion.show(productsView);
});

$(document).ready(function(){
  var products = new ProductsCollection([
    { title: 'P1', sku:'1', price:'19.99' },
    { title: 'P2', sku:'2', price:'19.99' },
    { title: 'P3', sku:'3', price:'19.99' }
  ]);
 
  ProductApp.start({prod: products});
});