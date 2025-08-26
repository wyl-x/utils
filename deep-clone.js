function deepClone(target, wm = new WeakMap()) {
  if (target === null) return target // null 直接返回
  if (target instanceof Date) return new Date(target)
  if (target instanceof RegExp) return new RegExp(target)
  // 可能是对象或者普通的值，如果是函数的不需要深拷贝
  if (typeof target !== 'object') {
    // 包括: boolean | number | string | undefined | function
    return target
  }
  // 防止循环引用
  if (wm.get(target)) {
    return wm.get(target)
  }
  // 实例的构造函数，就是其类原型的构造函数constructor()方法，类原型的构造函数constructor，直接指向类本身
  // obj.constructor === Object.prototype.constructor === Object
  let cloneTarget = new target.constructor()
  wm.set(target, cloneTarget)
  for (let key in target) {
    cloneTarget[key] = deepClone(target[key], wm)
  }
  return cloneTarget
}
let source = {
  name: '库里',
  player: {
    num: 30,
    age: 34
  },
  date: new Date(),
  reg: /^[1-9]$/,
  err: new Error('err'),
  undef: undefined,
  func: () => {
    console.log('func')
  },
  nan: NaN,
  infinityMax: Infinity,
  infinityMin: -Infinity
}
source.self = source // 循环引用，即对象的属性间接或直接的引用了自身的情况
let target = deepClone(source)
console.log('source:', source)
console.log('target:', target)
