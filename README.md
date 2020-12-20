A markdown-it plugin to set wrap tables into a div for horizontal scrolling on narrow screens.  

Example:

``` md
Column | Column
------ | ------
Cell   | Cell  
```

will become 

``` html
<div class="scroll-table" style="overflow-x:auto">
    <table>
        <thead>
            <tr>
                <th>Column</th>
                <th>Column</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Cell</td>
                <td>Cell</td>
            </tr>
        </tbody>
    </table>
</div>
```

Also, html in your markdown, like for example

``` html
<table>
    <thead>
        <tr>
            <th>Column</th>
            <th>Column</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Cell</td>
            <td>Cell</td>
        </tr>
    </tbody>
</table>
```

will be transformed into 

``` html
<div class="scroll-table" style="overflow-x:auto">
    <table>
        <thead>
            <tr>
                <th>Column</th>
                <th>Column</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Cell</td>
                <td>Cell</td>
            </tr>
        </tbody>
    </table>
</div>
```

## Usage

``` js
var markdownIt = require('markdown-it');
var markdownItScrollTable = require('markdown-it-scrolltable');

markdownIt({
        html: true,
        linkify: true,
        typographer: true,
    })
    .use(markdownItScrollTable);
```

