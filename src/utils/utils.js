// 防抖函数
export const _debounce = (fn, wait = 50) => {
    let timer = null
    return function (...args) {
        const context = this
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, wait)
    }
} 
