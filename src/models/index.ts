const files = require.context('.', false, /\.ts$/)

const routes: any = []
files.keys().forEach((key: any) => {
  if (key.indexOf('index.ts') > -1) return
  if (files(key).default instanceof Array) {
    routes.push(...files(key).default)
  } else if (files(key).default instanceof Object) {
    routes.push(files(key).default)
  }
})
export default routes
