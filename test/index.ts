import { vrello } from '../lib/src'

const db = vrello({ path: __dirname + '\\demo.json', metadata: { addDates: true, addIds: true }, security: { idLength: 16 } })

db.default('array-test', [])

setInterval(() => {
    db.append('array-test', { time: Date.now(), math: Math.random() })
}, 500)

// keep alive
setInterval(() => {}, 1)