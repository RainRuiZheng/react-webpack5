import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from '@/store'
import routes from '@/router'
import '@/styles/App.css'
import '@/styles/App.less'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={createBrowserRouter(routes)} />
  </Provider>
)

// console.log(module,'===',module.hot)
// if (module.hot) {
//   module.hot.accept()
// }
