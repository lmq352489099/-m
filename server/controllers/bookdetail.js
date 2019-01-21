const {
    mysql
} = require('../qcloud')
module.exports = async (ctx) => {
    const {
        id
    } = ctx.request.query
    const detail = await mysql('books')
        .select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
        .where('id', id)
        .first()
    const info = JSON.parse(detail.user_info)
    ctx.state.data = Object.assign({}, detail, {
        tags: detail.tags.split(','),
        summary: detail.summary.split('\n'),
        user_info: {
            image: info.avatarUrl,
            name: info.nickName
        }
    })
    console.log(detail)

    // console.log(id);
    // console.log(ctx.request.query);

    await mysql('books')
        .where('id', id) // 限制查询语句
        .increment('count', 1) // 累加1
}
