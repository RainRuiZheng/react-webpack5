/**
 * 基本Model app.js, 在src/store/index.js中被挂载到store上，命名为app
 * 可用于存放通用信息，比如用户数据、角色、权限、省市区等通用数据
 * * */
export default {
  namespace: 'commonData',
  state: {
    userinfo: null, // 用户信息
    isFetching: false,
    fetchText: '',
    name: ''
  },

  reducers: {
    setUserInfo(state: any, { payload }: any) {
      // console.log('payload', payload)
      return { ...state, userinfo: payload }
    }
  },

  /** actions 可以是一个对象，也可以是一个函数，函数的第1个参数自动被注入dispatch(见models/test.js) * */
  effects: {
    // 模拟获取用户信息
    *getUserinfo({ params }: any, { put }: any) {
      // console.log('getUserinfo', params)
      // const user = { id: params?.id, username: 'admin' }
      yield put({
        type: 'setUserInfo',
        payload: params
      })
      // this.setUserInfo(user); // 这个setUserInfo就是上面reducers中的setUserInfo
      // return user
    }
  }
}
