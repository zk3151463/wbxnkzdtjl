import axios from 'axios'

let baseUrl = 'http://localhost:3000'
// 获取轮播图的api type:资源类型，对应以下类型，默认为0即pc
//1.Android 2.iPhone 3.iPad


export function getBanner(type=0){
    return axios.get(`${baseUrl}/banner?type=${type}`)
}

// 获取推荐歌单,可选参数：limit:取出数量，默认为10（不支持offset）
export function getMusicList(limit=10){
    return axios.get(`${baseUrl}/personalized?limit=${limit}`)
}

// 获取歌单的详情
export function getPlaylistDetail(id){
    return axios.get(`${baseUrl}/playlist/detail?id=${id}`)
}
// 获取歌词
export function getLyric(id){
    return axios.get(`${baseUrl}/lyric?id=${id}`)
}
// 搜索歌词
export function searchMusic(keyword){
    return axios.get(`${baseUrl}/search?keyword=${keyword}`)
}

export default{
    getBanner,getMusicList,getPlaylistDetail,getLyric,searchMusic
}