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