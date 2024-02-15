# 豆瓣API

## 豆瓣查询建议API

### Url

`https://book.douban.com/j/subject_suggest?q=9787222224926`

### 参数：`q`

### 返回结果

```js
{
  author_name: "[荷]杜布拉夫卡·乌格雷西奇",
  id: "36668331",
  pic: "https://img3.doubanio.com/view/subject/s/public/s34729813.jpg",
  title: "无条件投降博物馆",
  type: "b",
  url: "https://book.douban.com/subject/36668331/",
  year: "2024"
}
```

## 图书信息

### Url

`https://book.douban.com/subject/36668331/`

### 参数

`/subject/{id}`

### 结果

#### HTML

```html
<div id="mainpic" class="">
  <a class="nbg" href="https://img3.doubanio.com/view/subject/l/public/s34729813.jpg" title="无条件投降博物馆">
    <img src="https://img3.doubanio.com/view/subject/s/public/s34729813.jpg" title="点击看大图" alt="无条件投降博物馆" rel="v:photo"
      style="max-width: 135px;max-height: 200px;">
  </a>
</div>
<div id="info" class="">
  <span>
    <span class="pl"> 作者</span>:
    <a class="" href="/author/4610649">[荷]杜布拉夫卡·乌格雷西奇</a>
  </span><br />
  <span class="pl">出版社:</span>
  <a href="https://book.douban.com/press/2398">云南人民出版社</a>
  <br>
  <span class="pl">出品方:</span>
  <a href="https://book.douban.com/producers/4">理想国</a>
  <br>
  <span class="pl">原作名:</span> Muzej bezuvjetne predaje<br />
  <span>
    <span class="pl"> 译者</span>:
    <a class="" href="/search/%E4%BD%95%E9%9D%99%E8%8A%9D">何静芝</a>
  </span><br />
  <span class="pl">出版年:</span> 2024-1-1<br />
  <span class="pl">页数:</span> 380<br />
  <span class="pl">定价:</span> 64.00元<br />
  <span class="pl">装帧:</span> 平装<br />
  <span class="pl">丛书:</span>&nbsp;<a href="https://book.douban.com/series/64945">理想国：杜布拉夫卡·乌格雷西奇作品</a><br>
  <span class="pl">ISBN:</span> 9787222224926<br />
</div>
```
