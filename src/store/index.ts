/** 全局唯一数据中心 * */
import { init } from '@rematch/core'

import app from './models/app'

export default init({
  models: {
    app
  }
})
