jQuery Dropdown plugin: Includes server side pagination & search records.

![alt tag](http://i.imgur.com/c1RgeTg.png)

See demo: [http://searchandselectjquery.apphb.com/SearchAndSelect/demo/](http://searchandselectjquery.apphb.com/SearchAndSelect/demo/)

### Dependencies. 
1. Twitter Bootstrap

In HTML

Define empty div

```html
<div id="dvSearchAndSelect">
    </div>
```

In JS

```js
var options = {
                url: 'http://countrylistapi.apphb.com/api/country',
                selectedItem: {
                    key: 1,
                    value: 'India'
                },
                onItemClicked: function (item) {
                    alert(item.value);
                }
            };

            $("#dvSearchAndSelect").searchAndSelect(options);
```
The complete code is available in this repository. Please refer.

## Contributing

If you have questions with the instructions above, feel free to add them as issues in the repository. 

*By contributing to this repository you are agreeing to make your content available subject to the license of this repository.*

### Process
    1. Add/discuss the changes in a GitHub issue.
    2. Create a Pull Request, provide enough details like why it is needed and reference the issue.
    3. The Pull Request will be evaluated and either merged or declined.

## License (The MIT License)
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
