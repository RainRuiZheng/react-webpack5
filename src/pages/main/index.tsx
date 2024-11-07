import { useStore } from 'react-redux'

export default function Main(props: any) {
  const store = useStore()
  console.log('store:', store)
  console.log('what props:', props)
  return <h3>Main</h3>
}
