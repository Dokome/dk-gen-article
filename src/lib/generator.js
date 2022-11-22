import { createRandomPick, randomInt } from './random.js'

const sentence = (pick, replacer) => {
  let ret = pick()

  for (const key in replacer) {
    ret = ret.replace(
      new RegExp(`{{${key}}}`, 'g'),
      typeof replacer[key] === 'function' ? replacer[key]() : replacer[key]
    )
  }

  return ret
}

// 文章生成
export const generate = (title, { corpus, min = 5000, max = 10000 }) => {
  const lenOfArticles = randomInt(min, max)
  const { famous, bosh_before, bosh, said, conclude } = corpus
  const [pickFamous, pickBoshBefore, pickBosh, pickSaid, pickConclude] = [
    famous,
    bosh_before,
    bosh,
    said,
    conclude,
  ].map(item => createRandomPick(item))

  const article = []
  let lenOfTotal = 0

  while (lenOfTotal < lenOfArticles) {
    const lenOfSection = randomInt(200, 500)
    let section = ''

    while (section.length < lenOfSection || !/[。？]$/.test(section)) {
      const n = randomInt(0, 100)
      if (n < 20) {
        section += sentence(pickFamous, {
          said: pickSaid,
          conclude: pickConclude,
          title,
        })
      } else if (n < 50) {
        section +=
          sentence(pickBoshBefore, { title }) + sentence(pickBosh, { title })
      } else {
        section += sentence(pickBosh, { title })
      }
    }

    lenOfTotal += section.length
    article.push(section)
  }

  return article
}
