const files = require.context('.', false, /\.tsx$/)

const routes: any = []
files.keys().forEach(key => {
  if (files(key).default instanceof Array) {
    routes.push(...files(key).default)
  } else if (files(key).default instanceof Object) {
    routes.push(files(key).default)
  }
})
export default routes
