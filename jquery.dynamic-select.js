/**
 * Dynamic Select
 * Populate and repopulate a select on the fly.
 *
 * Copyright (c) 2009 PJ Dietz
 * Version: 1.00
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * http://pjdietz.com/jquery-plugins/dynamic-select/
 */
 
/*global jQuery */

(function ($) {

    var DynamicSelect;
    
    DynamicSelect = function (element, options) {
        
        // Store a reference to the DOM element.  
        this.domSelect = element;
        
        // Store a reference to this instance in the DOM element's data
        this.domSelect.data('dynamicSelect', this);
        
        // Merge the options
        if (typeof options === "object" && 
                typeof options.filter === "function") {
            
            this.filter = options.filter;
        }

    };
    
    DynamicSelect.prototype = {
        
        // Given an object, return an object to use as key-value pairs for use
        // as the value and labels of the options.
        // 
        // The default is to pass the options through as is, but this can 
        // be altered by passing a new filter in through the options when
        // setting up the instance or by calling setFilter.
        //
        filter: function (options) {
            return options;    
        },
                
        // Change the value and fire the change event
        set: function (value) {
            this.domSelect.val(value);
            this.domSelect.change();    
        },
        
        // Attach a new filter function
        setFilter: function (func) {
            this.filter = func;    
        },
        
        // Update the select with the passed options. The instance's filter
        // function will be called on the passed options.  
        update: function (opts) {
            
            var 
                /* Data elements */
                opt,
                subopt,
                
                /* DOM elements */
                option,
                optgroup,
                
                /* Loop counters */
                i, u, j, v;
                
            
            
            // Clear out the old items.        
            this.domSelect.empty();    
            
            // Filter the options
            opts = this.filter(opts);
            
            for (i = 0, u = opts.length; i < u; i += 1) {
                opt = opts[i];

                // Add a new option                
                if (!$.isArray(opt.value)) {

                    option = $("<option></option")
                        .attr("value", opt.value)
                        .text(opt.label);
                
                    this.domSelect.append(option);

                }
                
                // Add an optgroup
                else {

                    optgroup = $('<optgroup></optgroup>')
                        .attr('label', opt.label);
                        
                    for (j = 0, v = opt.value.length; j < v; j += 1) {

                        subopt = opt.value[j];
                      
                        optgroup.append(
                            $('<option></option>')
                                .attr('value', subopt.value)
                                .text(subopt.label)
                        );
                    }              
    
                    this.domSelect.append(optgroup);

                }
                
            }
            
            this.domSelect.change();
            
        }
        
        
    };
    
    
    

    // -------------------------------------------------------------------------
    // Extend jQuery 

    if (typeof $.fn.dynamicSelect === "undefined") {
     
        $.fn.extend({  
            
            dynamicSelect: function () {
                
                var method, options;
                
                if (typeof arguments[0] !== "string") {
                    method = "create";
                    options = arguments[0];
                }
                else {
                    method = arguments[0];
                    options = arguments[1];
                
                }
                
                                
                return this.each(function () {
                                           
                    var ds;
                
                    ds = $(this).data("dynamicSelect");
                    
                    // No DynamicSelect setup yet. Let's create one!
                    if (typeof ds === "undefined") {
                        ds = new DynamicSelect($(this), options);
                    }

                    switch (method) {
                    case "set":
                        ds.set(options);
                        break;
                    
                    case "setFilter":
                        ds.setFilter(options);
                        break;
                            
                    case "update":
                        ds.update(options);
                        break;
                    }

                });

                 
            }
           
        });    
        
    }      

}(jQuery));
