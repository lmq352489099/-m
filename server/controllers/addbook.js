const https = require('https')
const {
    mysql
} = require('../qcloud')
// 新增图书
// 1.获取豆瓣信息
// https://api.douban.com/v2/book/isbn/9787536692930
// 2.入库

module.exports = async (ctx) => {
    const {
        isbn,
        openid
    } = ctx.request.body
    //   console.log(isbn);

    if (isbn && openid) {
    // 数组
        const findRes = await mysql('books').select().where('isbn', isbn)
        console.log(findRes)
        if (findRes.length) {
            ctx.state = {
                code: 1,
                data: {
                    msg: '图书已存在'
                }
            }
            return
        }
        let url = 'https://api.douban.com/v2/book/isbn/' + isbn
        const bookinfo = await getJSon(url)
        const rate = bookinfo.rating.average
        const {
            title,
            image,
            alt,
            publisher,
            summary,
            price
        } = bookinfo
        // console.log(bookinfo);
        const tags = bookinfo.tags.map(v => {
            return `${v.title} ${v.count}`
        }).join(',')
        const author = bookinfo.author.join(',')
        // console.log(author);
        // console.log({rate,title,image,alt,publisher,summary,price,tags,author});
        try {
            await mysql('books').insert({
                isbn,
                openid,
                rate,
                title,
                image,
                alt,
                publisher,
                summary,
                price,
                tags,
                author
            })
            ctx.state.data = {
                title,
                msg: 'success'
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '新增失败' + e.sqlMessage
                }
            }
        }
    // tag:科幻 1000,小说500
    }
}

function getJSon (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                if (bookinfo.title) {
                    resolve(bookinfo)
                }
                reject(bookinfo)
            })
        })
    })
}
