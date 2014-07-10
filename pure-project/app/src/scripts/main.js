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

	var main = {
		index: function () {
			// get data
			main.preview();
		},
		preview:function () {
			Products.get(function(data){
				Views.render('list', data, ["title", "sku", "price", "prodId"]);
				//console.log(data)
			})	
		},
		edit:function () {
			//Products.get(function(data){
				console.log('edit');
			//})	
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

		render: function(view, data, params) {
			var template = this.getView(view);
			var tmpTeplate = template;
			var result = [];
			$.each( data, function( i, dataObj ) {
				tmpTeplate = template;
			 	$.each( params, function( j, dataParam ) {
			 		console.log(dataObj, dataParam);
			 		tmpTeplate = tmpTeplate.replace('{{'+dataParam+'}}', dataObj[dataParam]);
			 	});
			 	result.push(tmpTeplate);

			});
			console.log(result);
			//for(var i = 0, l = params.length; i < l; i++){
			//	if()	
			//}
			// console.log(template);
		}
	}

	var Products = {
		path:"src/scripts/fake/data.json",
		init: function() {
			this.fetch();
		},
		attachTemplate: function(tpl) {
			var template = tpl,
				$prodBody = $("#products-table-body");
				readyTpl = [];

			$.each(this.productsList, function(index, obj) {
				readyTpl[readyTpl.length] = template.replace(/{{title}}/ig, obj.title)
									.replace(/{{sku}}/ig, obj.sku)
									.replace(/{{price}}/ig, obj.price)
									.replace(/{{prodId}}/ig, index);
			});

			$prodBody.html(readyTpl.join(""));
			$prodBody.find('.actions > .btn').click(function() {
				console.log($(this).attr('data-action'));
			})
			
			$('#view').append(template);
		},
		fetch: function() {
			var self = this;

			$.getJSON(this.path, function(data) {
				self.productsList = data.products;
				Views.getView("list", $.proxy( Products.attachTemplate, Products));
			});
		},
		get: function(callback) {
			var self = this;
			if (!self.productsList)
			{
				$.getJSON(this.path, function(data) {
					self.productsList = data.products;
					callback(data.products);
				});
			} else {
				callback(self.productsList);
			}
		}
	};

	//Products.init();

});