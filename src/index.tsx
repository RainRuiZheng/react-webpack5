import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from '@/store'
import routes from '@/router'
import '@/styles/App.css'
import '@/styles/App.less'

console.log(store)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={createBrowserRouter(routes)} />
  </Provider>
)

// if (module.hot) {
//   module.hot.accept();
// }
