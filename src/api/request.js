import axios from './axios'

export const request = (url, option) => {
    return new Promise((resolve, reject) => {
        axios({
            method: option.method,
            url
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}