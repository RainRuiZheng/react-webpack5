import { useState } from 'react'
import '@/app.css'
import  lessStyles from '@/app.less';
// import Loading from '@/components/Loading';
// import smallImg from '@/assets/imgs/small_img.png';
// import bigImg from '@/assets/imgs/big_img.png';
// import memberList from '@/json/test.json';
import ClassComponent from '@/components/ClassComponent'


// console.log(memberList,1)
function App() {
  const [ count, setCounts ] = useState('')
  const onChange = (e: any) => {
    setCounts(e.target.value)
  }
  return <div>
    <h2>webpack5-react-ts</h2>
    <div className={lessStyles.lessBox}>
      <div className={lessStyles["box"]}> lessBox1</div>
      {/* <img src={smallImg} alt="小于9kb的图片" />
      <img src={bigImg} alt="大于9kb的图片" />
      <div className={lessStyles['smallImg']}>小图片背景</div>
      <div className={lessStyles['bigImg']}>大图片背景</div> */}
    </div>
    {/* <Loading isLoading={true} /> */}
    <ClassComponent />
    <div>
        <p>受控组件</p>
        <input type="text" value={count} onChange={onChange} />
        <br />
        <p>非受控组件</p>
        <input type="text" />
    </div>
  </div>
}

export default App
