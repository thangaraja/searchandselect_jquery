
/* jQuery dropdown plugin
 *
 * Copyright (c) 2016, Thangaraja Chinnathambi 
 * Released under the MIT licence 
 *
 * version: 1.0.0 
 * 20-Jan-2016
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
; (function ($, window, document, undefined) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var searchandselect = 'searchandselect',
      defaults = {
          version: '1.0.0',
          url: '',
          selectedItem: {
              key: -1,
              value: ''
          },
          data: {
              pageNumber: 1,
              searchKey: ''
          },
          onItemClicked: null
      };

    var listItem = "<li key='{{Key}}' class='listitem'><span>{{Value}}</span></li>";
    var listItemNoRecords = "<li><span>No Records</span></li>";

    var htmlTemplate = "<div class='header'>" +
            "<b></b>" +
            "<span class='pull-right glyphicon glyphicon-chevron-down'></span>" +
        "</div>" +
        "<div class='search'>" +
            "<div class='input-group'>" +
                "<input type='text' class='form-control' placeholder='Search for...'>" +
                "<span class='input-group-btn'>" +
                    "<button class='btn btn-default' type='button'><i class='glyphicon glyphicon-search'></i></button>" +
                "</span>" +
            "</div>" +
            "<div class='text-right nomargin nopadding'><small class='pageinfo'>Showing records</small></div>" +
        "</div>" +
        "<ul class='dropdown'>" +
            "<li>" +
                "<span></span>" +
                "<i class='glyphicon glyphicon-ok'></i>" +
            "</li>" +
            "<li>" +
                "No Records" +
            "</li>" +
        "</ul>";

    // The actual plugin constructor
    function SearchAndSelect(element, options) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.$element = $(element).append(htmlTemplate).addClass("searchandselect");
        //Merge defaults with given  (use deep copy)
        this.options = $.extend(true, {}, defaults, options);
        this._defaults = defaults;
        this._name = searchandselect;
        this._fetchingRecords = false;
        SearchAndSelect.prototype.plugin = this;
        this._init();
    };

    // Avoid Plugin.prototype conflicts
    $.extend(SearchAndSelect.prototype, {
        _init: function () {
            this._getData();
        },
        _getData: function (onScroll) {
            if (this._fetchingRecords) return;
            this._fetchingRecords = true;
            if (onScroll) {
                this.options.data.pageNumber = parseInt(this.options.data.pageNumber, 10) + 1;
            }
            var that = this;
            $.get(this.options.url, this.options.data)
               .done(function (result) {
                   that._loadResult(result);
                   that.options.callback && that.options.callback();
                   that._fetchingRecords = false;
               });
        },
        _loadResult: function (result) {
            var resultContainer = this.$element.find("ul.dropdown");
            if (result.Records.length == 0) {
                resultContainer.html(listItemNoRecords);
            }
            else {
                var outputRecords = "";
                for (var index = 0; index < result.Records.length; index++) {
                    var currentRecord = result.Records[index];
                    outputRecords = outputRecords + listItem.replace("{{Value}}", currentRecord.Key).replace("{{Key}}", currentRecord.Value);
                }
                if (this.options.data.pageNumber > 1)
                    resultContainer.append(outputRecords);
                else
                    resultContainer.html(outputRecords);
            }
            this._activateSearch();
            this._bindActions();
            this._activateScroll();
            if (this.options.selectedItem.key != -1)
                this.$element.find(".header b").text(this.options.selectedItem.value);
            this._updatePager(result.TotalRecords, this.options.data.pageNumber);
        },
        _activateScroll: function () {
            var item = this.$element.find("ul.dropdown");
            var that = this;
            item.scroll(function (e) {
                var currentItem = $(this);
                if (currentItem.scrollTop() + currentItem.innerHeight() >= currentItem[0].scrollHeight) {
                    that._getData(true);
                }
            });
        },
        _bindActions: function () {
            var that = this;
            this.$element.find(".header").click(function () {
                that.$element.toggleClass("active");
                that.$element.find(".glyphicon-chevron-up, .glyphicon-chevron-down").toggleClass("glyphicon-chevron-up glyphicon-chevron-down");
            });
            this.$element.find("li.listitem").click(function () {
                var clickedItem = $(this);
                var selectedItem = {
                    key: clickedItem.attr("key"),
                    value: clickedItem.find("span").text()
                };
                that.$element.find(".header b").text(selectedItem.value);
                that.$element.find(".dropdown i").remove();
                clickedItem.find("span").after("<i class='glyphicon glyphicon-ok'></i>");
                if (that.options.onItemClicked) that.options.onItemClicked(selectedItem);
                that.$element.find(".header").click();
            });
        },
        _updatePager: function (count, pageNumber) {
            this.$element.find("span.totalpage").text(count);
            if (pageNumber) {
                var records = pageNumber * 10;
                if (records > count)
                    records = count;
                this.$element.find(".pageinfo").text("Showing records 1 to " + records + " of " + count);
            }
        },
        _activateSearch: function () {
            var searchBox = this.$element.find(".search input");
            var that = this;
            searchBox.keyup(function () {
                var length = searchBox.val().length;
                if (length < 3) return;
                that.options.data = {
                    searchKey: searchBox.val(),
                    pageNumber: 1
                };
                that._getData();
            });
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn.searchAndSelect = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + searchandselect)) {
                $.data(this, "plugin_" + searchandselect, new SearchAndSelect(this, options));
            }
        });
    };    

})(jQuery, window, document);
