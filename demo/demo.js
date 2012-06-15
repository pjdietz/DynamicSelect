/*global jQuery */

(function ($) {

    "use strict";

    $(document).ready(function () {

        // Create a "vanilla" DynamicSelect.
        $("#dynamic").dynamicSelect();

        // When the user clicks the populate button, send some an array of objects
        // to the DynamicSelect in the standard format.
        $("#populate").on("click", function () {

            var opts = [
                { label: "Homer", value: "1" },
                { label: "Marge", value: "2" },
                { label: "Bart", value: "3" },
                { label: "Lisa", value: "4" },
                { label: "Maggie", value: "5" },
                { label: "An optgroup", value: [
                    { label: "Lenny", value: "6" },
                    { label: "Karl", value: "7" }
                ]}
            ];

            $("#dynamic").dynamicSelect("update", opts);

        });

        // Create a DynamicSelect with a filter function.
        //
        // This function expects an object. The function uses the key-value pairs
        // to create an array of objects in the standard format.
        //
        $("#dynamic-filter").dynamicSelect({

            filter: function (options) {

                var prop, filtered;

                // Make an empty array to store the filtered options to.
                filtered = [];

                // Iterate through the properties and add objects of the expected
                // format to the filtered array.
                for (prop in options) {
                    if (options.hasOwnProperty(prop)) {
                        filtered.push({
                            value: prop,
                            label: options[prop]
                        });
                    }
                }

                return filtered;

            }

        });

        // Send an object to the DynamicSelect and let the filter function turn
        // the key-value pairs into something it can use.
        $("#populate-filter").on("click", function () {

            var opts = {
                fry: "Philip J. Fry",
                leela: "Turanga Leela",
                bender: "Bender",
                amy: "Amy Wong",
                professor: "Professor Hubert J. Farnsworth",
                zoidberg: "Dr. John A. Zoidberg"
            };

            $("#dynamic-filter").dynamicSelect("update", opts);

        });

    });

}(jQuery));
