$(function(){
	$(window).ready(function() {
		 Hash.set("page", "preview");
	});

	var Preview = {
		init:function(context){

		}
	} 

	$(window).on('hashchange', function() {
	  var page = Hash.get("page");
	  if(main[page]) 
	  	main[page]();
	  else 
	  	main.index();
	});

	var main = {
		index: function () {
			// get data
			main.preview();
		},
		preview:function () {
			/*Products.get(function(data){
				Views.parseTemplate('list', data, ["title", "sku", "price", "prodId"]);
				//console.log(data)
			});
			*/
			var data = Products.get();
			var htmlItems = Views.parseTemplate('product-list-item-tpl', data, ["title", "sku", "price"]);
			console.log(htmlItems);
			Views.render('product-list-tpl', [{'items':htmlItems}], ["items"]);
			Preview.init();

		},
		edit:function () {
			var data = [{'title':'lolol', 'sku':'12', 'price':'123'}];
			Views.render('edit-product-tpl', data, ["title", "sku", "price"]);
			Preview.init();	
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
				if(callback)
					callback(html);

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
			 		tmpTeplate = tmpTeplate.replace('{{'+dataParam+'}}', dataObj[dataParam]);
			 	});
			 	result.push(tmpTeplate);

			});
			return result.join('');
			//console.log(result);
			//for(var i = 0, l = params.length; i < l; i++){
			//	if()	
			//}
			// console.log(template);
		}
	}

	var Products = {
		path:"src/scripts/fake/data.json",
		//init: function() {
		//	this.fetch();
		//},
		// attachTemplate: function(tpl) {
		// 	var template = tpl,
		// 		$prodBody = $("#products-table-body");
		// 		readyTpl = [];

		// 	$.each(this.productsList, function(index, obj) {
		// 		readyTpl[readyTpl.length] = template.replace(/{{title}}/ig, obj.title)
		// 							.replace(/{{sku}}/ig, obj.sku)
		// 							.replace(/{{price}}/ig, obj.price)
		// 							.replace(/{{prodId}}/ig, index);
		// 	});

		// 	$prodBody.html(readyTpl.join(""));
		// 	$prodBody.find('.actions > .btn').click(function() {
		// 		console.log($(this).attr('data-action'));
		// 	})
			
		// 	$('#view').append(template);
		// },

		getById: function() {
			var self = this;

			/*$.getJSON(this.path, function(data) {
				self.productsList = data.products;
				Views.getView("list", $.proxy( Products.attachTemplate, Products));
			});*/
			
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
				// $.getJSON(this.path, function(data) {
				// 	self.productsList = data.products;
				// 	callback(data.products);
				// });
			//} else {
			//	callback(self.productsList);
			}
			return self.productsList;
		}
	};

	//Products.init();

});