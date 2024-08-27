import { request } from '@/api/request'

// https://itunes.apple.com/hk/rss/topgrossingapplications/limit=${limit}/json
// https://itunes.apple.com/hk/rss/topfreeapplications/limit=${limit}/json
// https://itunes.apple.com/hk/lookup?id=${id}

// 获取畅销的应用程序列表
export const getTopgrossingapplicationsList = (limit) => {
    return request(`/hk/rss/topgrossingapplications/limit=${limit}/json`, {
        methods: 'GET'
    })
}
// 获取热门免费应用列表
export const getTopfreeapplicationsList = (limit) => {
    return request(`/hk/rss/topfreeapplications/limit=${limit}/json`, {
        methods: 'GET'
    })
}
