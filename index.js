const cheerio = require('cheerio');
const wrapperStyle = 'class="scroll-table" style="overflow-x:auto;"';

function wrapTables(md) {
    const htmlBlockRenderer = md.renderer.rules.html_block;

    const wrapRenderer = function(tokens, idx, options, env, self) {
        try {
            let token = tokens[idx];
            let content = token.content;
            let $ = cheerio.load(content);

            let tables = $('table');
            if (tables.length) {
                tables.each(function() {
                    $(this).wrap(`<div ${wrapperStyle}></div>`);
                });

                return $('body').html();
            }
        } catch (err) {
            console.error(`Failure when wrapping table ${err}`);
        }
    }

    md.renderer.rules.html_block = function(tokens, idx, options, env, self) {
        let html = wrapRenderer(tokens, idx, options, env, self);
        if (html) {
            return html;
        } else {
            return htmlBlockRenderer(tokens, idx, options, env, self);
        }
    }

    md.renderer.rules.table_open = function(tokens, idx, options) {
        return `<div ${wrapperStyle}><table>`;
    }

    md.renderer.rules.table_close = function(tokens, idx, options) {
        return '</table></div>';
    }
}




module.exports = wrapTables;