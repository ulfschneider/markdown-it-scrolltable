const wrapperStyle = 'class="scroll-table" style="overflow-x:auto;"';

function wrapTables(md) {
    const htmlBlockRenderer = md.renderer.rules.html_block;

    const wrapRenderer = function(tokens, idx, options, env, self) {
        try {
            let token = tokens[idx];
            let content = token.content;
            content = content.replace(/<table\s.*>/gi, `<div ${wrapperStyle}><table>`); //replace first

            content = content.replace(/<\/table>(?!.*<\/table>)/i, `</table></div>`); //replace last with negative lookahead
            //check https://jwcooney.com/2014/03/03/regular-expression-to-get-the-last-instance-of-a-word/

            return content;
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