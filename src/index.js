import { generate } from './lib/generator.js'
import data from './corpus/data.json' assert { type: 'json' }

// 获取当前脚本的 url
const corpus = data
const run = title => generate(title, { corpus })

export { run }
