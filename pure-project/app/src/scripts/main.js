$(function(){
	$(window).ready(function() {
		 Hash.set("page", "preview");
	});

	$(window).on('hashchange', function() {
		var page = Hash.get("page");
	  	if(main[page]) 
	  		main[page]();
	  	else 
	  		main.index();
	});

	window.productModel = {
		view: function(context){

		},
		onAddProduct: function(){
			Products.addProduct();
		},
		onSaveEdit: function(id, context){
			Products.editProduct(id, JSON.stringify(context));
		},
		onEdit: function(id){
			Hash.setParam("page=edit",'id',id);
		},
		onRemove: function(id){
			Products.deleteProduct(id);
		},
		cancel: function() {
			Hash.remove("page");
			Hash.remove("id");
			Hash.set("page", "preview");
		},
		export: function() {
			console.log(Products.get());
		}
	};

	var main = {
		index: function () {
			main.preview();
		},
		preview:function () {
			var data = Products.get();
			var htmlItems = Views.parseTemplate('product-list-item-tpl', data, ["title", "sku", "price"]);
			Views.render('product-list-tpl', [{'items':htmlItems}], ["items"]);
		},
		edit:function () {
			var id = Hash.get('id');
			var data = Products.getById(id);
			
			Views.render('edit-product-tpl', [data], ["title", "sku", "price"]);
		}
	}

	var Views = {
		getView: function(viewName, callback) {
			var tpl = '';
			$.ajax({
			  url: "src/scripts/templates/" + viewName + ".html",
			  async: false,
			  cache: false
			})
			.done(function( html ) {
				tpl = html;
				if(callback) callback(html);
			});
			return tpl;
		},
		render: function(name, data, params){
			var html = Views.parseTemplate(name, data, params);
			//console.log(html)
			$('#view').html(html);

		},
		parseTemplate: function(view, data, params) {
			var template = this.getView(view);
			var tmpTeplate = template;
			var result = [];
			$.each( data, function( i, dataObj ) {
				tmpTeplate = template;
			 	$.each( params, function( j, dataParam ) {
			 		var reg = new RegExp('{{'+dataParam+'}}',"g");
			 		tmpTeplate = tmpTeplate.replace(reg, dataObj[dataParam]);
			 	});
			 	result.push(tmpTeplate);

			});
			return result.join('');
		}
	}

	var Products = {
		path:"src/scripts/fake/data.json",
		addProduct: function(id, edited) {
			console.log("add", id, edited);
			
		},
		editProduct: function(id, edited) {
			console.log("edit", id, edited);

		},
		deleteProduct: function(id) {
			var self = this;
			$.each(this.get(), function(index, obj) {
				if(obj.sku == id) {
					self.productsList.splice(index, 1);
					return false;
				}
			});

			main.preview();
		},
		getById: function(id) {
			var result = {};
			$.each(this.get(), function(index, obj) {
				if(obj.sku == id) {
					result = obj;
					return false;
				}
			});
			return result;
		},
		get: function(callback) {
			var self = this;
			if (!self.productsList)
			{
				var data = null;
				$.ajax({
			  		url: this.path,
			  		async: false,
			  		cache: false
				}).done(function(data){
					self.productsList = data.products;
				});
			}
			return $.makeArray(self.productsList);
		}
	};

});