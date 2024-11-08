const user = {
  namespace: 'user',
  state: {
    name: '夜不语'
  },
  reducers: {
    changeUser(state: any, name: any) {
      // state为当前模块的state；name是调用changeUser的第一个参数；可使用多个参数
      console.log(state, name) // {name: '夜不语'}
      return { ...state, name } // 注意这里不能直接state.name = name修改值
    }
  },
  // 定义的函数可以使用异步操作，比如 async await
  effects: {
    // name是调用updateName的第一个参数；rootState是所有模块的state；
    // 若updateName('12', 10)两个参数，则updateName(name, rootState, number)第三个参数number则为10；其实第一个参数传对象就好了；
    // updateName(name: any, rootState: any) {
    //   console.log(name, rootState);
    //   this.changeUser(name) // 调用reducers的changeUser函数
    // }
  }
}
export default user
