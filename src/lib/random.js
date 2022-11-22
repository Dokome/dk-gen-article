// 随机模块
export const randomInt = (min, max) => {
  const p = Math.random()
  return Math.floor(min * (1 - p) + max * p)
}

export const createRandomPick = target => {
  const copy = target.slice()
  const len = copy.length - 1

  const randomPick = () => {
    const index = randomInt(0, len)
    const picked = copy[index]
    ;[copy[index], copy[len]] = [copy[len], copy[index]]

    return picked
  }

  // 除去第一次的影响
  randomPick()

  return randomPick
}
