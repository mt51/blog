function formatDate (d, fmt) {
  const date = new Date(d)
  let result = fmt.match(/y+/)
  let year = date.getFullYear()
  if (result) {
    fmt = fmt.replace(result[0], (year + '').substr(4 - result[0].length))
  }

  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (var key in o) {
    if (o.hasOwnProperty(key)) {
      result = fmt.match(new RegExp(key))
      if (result) {
        fmt = fmt.replace(result[0], o[key] < 10 ? '0' + o[key] : o[key])
      }
    }
  }
  return fmt
}

export default formatDate
