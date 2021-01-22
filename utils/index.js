export function changeAry(array, num) {
  let ary = []
  let temp = []
  if (!array || array.length === 0) {
    return ary
  }

  for (let index = 0; index < array.length; index++) {
    temp.push(array[index])
    if (index % num === num - 1) {
      ary.push(temp)
      temp = []
    }
  }
  if (temp.length > 0) {
    ary.push(temp)
  }
  temp = null
  return ary
}
