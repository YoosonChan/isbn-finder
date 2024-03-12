import axios, { AxiosError } from "axios"

export interface DisplayBookInfo {
  title: string // 书名
  img: string // 封面图片大图链接
  author: string // 作者（编者、译者）信息
  publisher: string //出版社
  pubDate: string // 出版日期
  page: string  // 页数
  price: string // 价格
  series: string  // 丛书信息（不是丛书为空字符串）
  isbn: string  // 13位isbn号
}

interface BookInfo extends DisplayBookInfo {
  // 常用
  smallImg: string // 封面
  pubPlace: string  // 出版地
  isbn10: string  // 10位isbn号
  gist: string  // 图书内容简介
  format: string  // 纸张开数
  binding: string // 装帧信息
  wordNum: string // 字数
  edition: string // 版次
  yinci: string // 印次
  paper: string // 书籍纸张类型
  language: string  // 语言
  keyword: string // 图书关键字
  annotation: string  // 一般附注
  batch: string // 丛编信息
  bookCatalog: string // 目录
  cipTxt: string  // cip信息
  genus: string // 中图分类号
  heatNum: string // 图书热度（即：购买或评论总人次）
  levelNum: string  // 读者评分
  subject: string // 价格
}


export interface ResponseBookInfo {
  success: boolean
  msg: string
  result?: BookInfo
}

const BOOK_INFO_DICT = { title: '标题', author: '作者', img: '封面', publisher: '出版社', pubDate: '出版日期', page: '页数', price: '定价', series: '丛书', isbn: 'ISBN' }

const host = 'https://jmisbn.market.alicloudapi.com'
const path = '/isbn/query'

export async function getBookInfo(isbn: string, appCode?: string) {
  if (appCode && appCode.length) {
    const url = host + path
    let response: ResponseBookInfo = { success: false, msg: '' }
    console.log(isbn);
    try {
      console.log(isbn);
      const res = await axios.post(url, { isbn }, { headers: { Authorization: 'APPCODE ' + appCode, "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8' } })
      const { data, success, msg } = res.data
      response.success = success
      response.msg = msg
      response.result = data.details
    } catch (error) {
      const { success, msg } = (error as AxiosError).response?.data as { success: boolean, msg: string }
      response.success = success
      response.msg = msg
      response.result = undefined
    }
    return response
  }
}

export function getDisplayInfo(details: BookInfo[]) {
  let display: DisplayBookInfo | undefined
  if (details) {
    const validKeys = ['title', 'author', 'img', 'publisher', 'pubDate', 'page', 'price', 'series', 'isbn']
    display = BOOK_INFO_DICT as DisplayBookInfo
    Object.keys(details[0]).forEach(key => {
      if (validKeys.includes(key) && display) {
        display[key as keyof DisplayBookInfo] = details[0][key as keyof BookInfo]
      }
    })
  }
  return display
}
