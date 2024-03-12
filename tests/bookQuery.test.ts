import { expect, test } from 'vitest'
import details from './fixture/bookInfo.json'
import { getDisplayInfo } from '../src/utils/bookQuery'
test('adds 1 + 2 to equal 3', () => {
  const result = { title: '惊呆了！哲学这么好', author: '田中正人', img: 'https://img2.jumdata.com/isbn/20231209/4ecd14c4-c9cd-422e-a5b1-22a020cd3443.jpg', publisher: '南海', pubDate: '2018-02-01', page: '351', price: '59', series: '', isbn: '9787544291538' }
  expect(getDisplayInfo(details)).toEqual(result)
})