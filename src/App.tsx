import '@/app.css'
import  lessStyles from '@/app.module.less';
import Loading from '@/components/Loading';
console.log(lessStyles,1)
function App() {
  return <div>
    <h2>webpack5-react-ts</h2>
    <div className={lessStyles.lessBox}>
      <div className={lessStyles["box"]}>lessBox</div>
    </div>
    <Loading isLoading={true} />
  </div>
}

export default App
