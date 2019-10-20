const fs = require('fs')

let tpl = '__resource.base.lua'
let manifest = '__resource.lua'


fs.readdir('./dist', (err, items) => {

    let cp = fs.createReadStream(tpl).pipe(fs.createWriteStream(manifest))
    cp.on('close', () => {
        fs.appendFileSync(manifest, `files {\n`);
        for (let item of items) {
            if (!/.*\.map/.test(item)) {
                if (items.indexOf(item) === items.length -1) {
                    fs.appendFileSync(manifest, `\t'dist/${item}'\n`);
                } else {
                    fs.appendFileSync(manifest, `\t'dist/${item}',\n`);

                }
            }
        }
        fs.appendFileSync(manifest, `}\n`);
    })

})