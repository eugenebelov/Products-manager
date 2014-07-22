define([
	'jquery',
	'underscore',
	'handlebars'
], function($, _, Handlebars) {
	
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
        } 
    
});