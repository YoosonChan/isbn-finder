import axios from "axios"

interface BookInfo {
  title: string
  cover: string
  imageSubject: string
  largeCover: string
  author: string
  authorUrl: string
  subtitle: string
  press: string
  pressUrl: string
  producters: string
  productersUrl: string
  origin: string
  translator: string
  translatorUrl: string
  year: string
  pages: string
  price: string
  binding: string
  series: string
  seriesUrl: string
}

const BOOK_INFO_DICT = { author: '作者', subtitle: '副标题', press: '出版社', producters: '出品方', origin: '原作名', translator: '译者', year: '出版年', pages: '页数', price: '定价', binding: '装帧', series: '丛书', isbn: 'ISBN' }
const BASE_URL = 'https://book.douban.com/j/subject_suggest'

export function getBookInfo(isbn: string) {
  console.log(isbn);
  // query book's simple information by ISBN
  getSimpleInfo(isbn)
  if (false) {
    getBookInfoFromHTML()
  }
}

function getSimpleInfo(isbn: string) {
  let id: string | undefined
  if (isbn) {
    const url = BASE_URL
    axios.get(url, { params: { p: isbn.trim() } }).then(res => {
      const { data } = res
      console.log('request-> ', data);
    })
  }
  return id
}

function getBookInfoFromHTML() {
  const imageSubject = document.getElementById('mainpic')
  const cover = imageSubject?.querySelector('img')?.src
  const title = imageSubject?.querySelector('a')?.title
  const largeCover = imageSubject?.querySelector('a')?.href

  let info: Partial<BookInfo> = { cover, title, largeCover }
  document.querySelectorAll('#info .pl').forEach(el => {
    let key: string | undefined,
      value: string | undefined,
      url: string | undefined
    if (el.nextSibling) {
      const nodeValue = el.nextSibling.nodeValue?.trim()
      // 正常文本赋值
      if (nodeValue) {
        if (nodeValue.length && !/^:/.test(nodeValue)) {
          value = nodeValue
        } else {
          const nextNodeValue = el.nextSibling.nextSibling as (HTMLAnchorElement | HTMLSpanElement)
          if (nextNodeValue) {
            // 带有链接的项
            if (nextNodeValue.localName && nextNodeValue.localName === 'a') {
              url = (nextNodeValue as HTMLAnchorElement).href
              value = nextNodeValue.innerText.trim()
            } else {
              // 冒号分离的项赋值
              value = nextNodeValue.nodeValue?.trim()
            }
          }
        }

      }
    }
    // 查找名称对应的字段名
    const keyValue = (el as HTMLSpanElement).innerText.trim().split(':')[0]
    const index = Object.values(BOOK_INFO_DICT).findIndex(val => val === keyValue)
    // 赋值
    if (index > -1) {
      key = Object.keys(BOOK_INFO_DICT)[index]
      // 带有链接的项
      switch (key) {
        case 'author': {
          info['authorUrl'] = url
          break
        }
        case 'press': {
          info['pressUrl'] = url
          break
        }
        case 'producters': {
          info['productersUrl'] = url
          break
        }
        case 'translator': {
          info['translatorUrl'] = url
          break
        }
        case 'series': {
          info['seriesUrl'] = url
          break
        }
        default:
          break
      }
      info[key as keyof BookInfo] = value
    }
  })
  return info
}