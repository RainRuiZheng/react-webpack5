// dva.js dva-core配置文件
import { create } from 'dva-core'
// 数据模块的集合，返回的是数组
import models from '@/models'

// 编写创建函数
function createApp(opts: any) {
  const app = create(opts)
  // 注册model，必须每个都需要注册
  models.forEach((model: any) => {
    app.model(model)
  })
  // 启动应用,必须在model注册完成后，在store获取之前
  app.start()
  // 获取store
  const store = app._store
  app.getStore = () => store
  app.dispatch = store.dispatch
  return app
}

const dva = createApp({})
export default dva.getStore()
