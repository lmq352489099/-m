const {
  mysql
} = require('../qcloud')
module.exports = async (ctx) => {
  const {
    bookid,
    openid
  } = ctx.request.query
  // console.log(bookid);
  console.log(openid);
  
  console.log("comments", bookid, openid);

  const mysqlSelect = mysql('comments')
    .select('comments.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
  let comments
  if (bookid) {
    //图书详情页的评论
	comments = await mysqlSelect.where('bookid', bookid)
	console.log(comments);
	
  } else if (openid) {
    //根据个人的openid筛选
	comments = await mysqlSelect.where('openid', openid)
	console.log(comments);
  }
  // console.log(comments)
  ctx.state.data = {
    list: comments.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, {
        title: info.nickName,
        image: info.avatarUrl
      })
    })
  }
}
