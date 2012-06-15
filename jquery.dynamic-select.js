/**
 * Dynamic Select
 * Populate and repopulate a select on the fly.
 *
 * Copyright (c) 2012 PJ Dietz
 * Version: 1.1.0
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * http://pjdietz.com/jquery-plugins/dynamic-select/
 */

/*global jQuery */

(function ($) {

    "use strict";

    var DynamicSelect;

    DynamicSelect = function (element, options) {

        // Merge the options.
        this.options = $.extend({}, $.fn.dynamicSelect.defaults, options);

        // Store a reference to the element.
        this.element = $(element);

    }; // DynamicSelect

    DynamicSelect.prototype = {

        update: function (options) {

            var option, subObtion, optionElem, optgroupElem, i, u, j, v;

            // Clear out the old items.
            this.element.empty();

            // Filter the options.
            options = this.options.filter(options);

            for (i = 0, u = options.length; i < u; i += 1) {

                // Reference the current option.
                option = options[i];

                if (!$.isArray(option.value)) {

                    // The value is not an array. Add an option.
                    optionElem = $("<option></option")
                        .attr("value", option.value)
                        .text(option.label);

                    // Append the option to the select.
                    this.element.append(optionElem);

                } else {

                    // The value is an array. Add an optgroup.
                    optgroupElem = $('<optgroup></optgroup>')
                        .attr('label', option.label);

                    // Add the sub-options to the optgroup.
                    for (j = 0, v = option.value.length; j < v; j += 1) {

                        // Reference the current sub-option.
                        subObtion = option.value[j];

                        // Make an option element.
                        optionElem = $("<option></option")
                            .attr("value", subObtion.value)
                            .text(subObtion.label);

                        // Append the option to the optgroup.
                        optgroupElem.append(optionElem);

                    }

                    // Append the optgroup to the select.
                    this.element.append(optgroupElem);

                } // if

            } // for

        } // update()

    }; // DynamicSelect.prototype

    // -------------------------------------------------------------------------
    // Extend jQuery

    if (typeof $.fn.freeow === "undefined") {

        $.fn.extend({

            dynamicSelect: function (method, options) {

                // If only one parameter was passed, assume the caller means
                // to use the contructor with options.
                if (typeof options === "undefined") {
                    options = method;
                }

                return this.each(function () {

                    var ds;

                    // Try to read the TabSet from the element.
                    ds = $(this).data("DynamicSelect");

                    // If no DynamicSelect exists, create one with the options.
                    if (typeof ds === "undefined") {
                        ds = new DynamicSelect($(this), options);
                        $(this).data("DynamicSelect", ds);
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

                    } // switch

                }); // this.each()

            } // dynamicSelect()

        }); // $.fn.extend()

        // Configuration Defaults.
        $.fn.dynamicSelect.defaults = {

            filter: function (options) {
                return options;
            }

        }; // $.fn.dynamicSelect.defaults

    } // if undefined

}(jQuery));
