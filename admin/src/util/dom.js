/**
 * @Author   liuziyang
 * @DateTime 2017-08-07
 * 一些通用方法操作DOM
 */

function trim (s) {
  return (s || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

/**
 * @Author   liuziyang
 * @DateTime 2017-08-07
 * @param    {[DOM元素]}   el  [DOM元素]
 * @param    {[String]}   cls [需要判断的类名]
 */
function hasClass (el, cls) {
  if (!el || !cls) return
  if (cls.indexOf(' ') !== -1) {
    throw new Error('类名中不能包含空格')
  }
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

/**
 * @Author   liuziyang
 * @DateTime 2017-08-07
 * @param    {[DOM元素]}   el  [DOM元素]
 * @param    {[String]}   cls [要添加的类名]
 */
export function addClass (el, cls) {
  if (!el || !cls) return
  var currentCls = el.className
  var classes = cls.split(' ')
  for (var i = 0; i < classes.length; i++) {
    var className = classes[i]
    if (!className) continue
    if (el.classList) {
      el.classList.add(className)
    } else {
      if (!hasClass(el, className)) {
        currentCls += ' ' + className
      }
    }
  }
  if (!el.classList) {
    el.className = currentCls
  }
}

/**
 * @Author   liuziyang
 * @DateTime 2017-08-07
 * @param    {[DOM元素]}   el  [DOM元素]
 * @param    {[String]}   cls [要删除的类名]
 */
export function removeClass (el, cls) {
  if (!el || !cls) return
  var classes = cls.split(' ')
  var currentCls = ' ' + el.className + ' '
  for (var i = 0; i < classes.length; i++) {
    var className = classes[i]
    if (!classes) continue
    if (el.classList) {
      el.classList.remove(className)
    } else {
      if (hasClass(className)) {
        currentCls.replace(' ' + currentCls + ' ', ' ')
      }
    }
  }
  if (!el.classList) {
    el.className = trim(currentCls)
  }
}
