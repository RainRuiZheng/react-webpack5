import { useStore, useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function Main(props: any) {
  const dispatch = useDispatch()
  const { userinfo } = useSelector((state: any) => {
    return {
      userinfo: state?.commonData?.userinfo
    }
  })

  useEffect(() => {
    dispatch({
      type: 'commonData/getUserinfo',
      params: { name: 'wwww' }
    })
  }, [])
  const store = useStore()
  console.log('store:', userinfo)
  // console.log('what props:', props)
  return <h3>Main</h3>
}
