import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { generate } from './lib/generator.js'
import { createRandomPick } from './lib/random.js'

// 获取当前脚本的 url
const curUrl = import.meta.url
const data = readFileSync(
  resolve(dirname(fileURLToPath(curUrl)), 'corpus/data.json'),
  { encoding: 'utf-8' }
)
const corpus = JSON.parse(data)

const pickTitle = createRandomPick(corpus.title)
const title = pickTitle()

const article = generate(title, { corpus })
console.log(`${title}\n\n  ${article.join(`\n `)}`)
