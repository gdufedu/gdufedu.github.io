import ajax from './ajax'
// 请求注册
export const reqRegister = (user) => ajax('/register', user, 'POST')
// 请求登陆
export const reqLogin = (user) => ajax('/login', user, 'POST')
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')
export const reqUser = () => ajax('/user')
export const reqUserList = (type) => ajax('/userlist', {type})
export const reqChatMsgList = () => ajax('/msglist')
export const reqReadMsg = (from) => ajax('/readmsg', {from}, 'POST')
