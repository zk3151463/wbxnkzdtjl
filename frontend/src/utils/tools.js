/*
 * @Author: LiBing
 * @Date: 2024-01-30 14:49:07
 * @LastEditTime: 2024-01-30 14:55:10
 */
export const getImgUrl = (url) => {
  console.log(url);
  return new URL(`../assets/${url}`,
    import.meta.url).href
}