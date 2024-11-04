import React, { lazy, Suspense, useState } from 'react'
const LazyDemo = lazy(() => import('@/components/LazyDemo')) // 使用import语法配合react的Lazy动态引入资源
// import '@/app.css'
// import  lessStyles from '@/app.less';
// import Loading from '@/components/Loading';
// import smallImg from '@/assets/imgs/small_img.png';
// import bigImg from '@/assets/imgs/big_img.png';
// import memberList from '@/json/test.json';
// import ClassComponent from '@/components/ClassComponent'

// prefetch
const PreFetchDemo = lazy(() => import(
  /* webpackChunkName: "PreFetchDemo" */
  /*webpackPrefetch: true*/
  '@/components/PreFetchDemo'
))

// preload
const PreloadDemo = lazy(() => import(
  /* webpackChunkName: "PreloadDemo" */
  /*webpackPreload: true*/
  '@/components/PreloadDemo'
 ))

function App() {
  // console.log(memberList,1)
  const [show, setShow] = useState(false);
  // const [count, setCounts] = useState('');
  // const onChange = (e: any) => {
  //   setCounts(e.target.value)
  // }
  // 点击事件中动态引入css, 设置show为true
  const handleOnClick = () => {
    import('@/app.css');
    setShow(true)
  }
  return <div>
    <h2>webpack5-react-ts</h2>
    <h2 onClick={handleOnClick}>展示</h2>
    { show && (
        <>
          <Suspense fallback={null}><PreloadDemo /></Suspense>
          <Suspense fallback={null}><PreFetchDemo /></Suspense>
        </>
      ) }

      {/* show为true时加载LazyDemo组件 */}
      {/* { show && <Suspense fallback={null}><LazyDemo /></Suspense> } */}
    {/* <div className={lessStyles.lessBox}>
      <div className={lessStyles["box"]}> lessBox1</div>
      <img src={smallImg} alt="小于9kb的图片" />
      <img src={bigImg} alt="大于9kb的图片" />
      <div className={lessStyles['smallImg']}>小图片背景</div>
      <div className={lessStyles['bigImg']}>大图片背景</div>
    </div> */}
    {/* <Loading isLoading={true} /> */}
    {/* <ClassComponent /> */}
    {/* <div>
        <p>受控组件</p>
        <input type="text" value={count} onChange={onChange} />
        <br />
        <p>非受控组件</p>
        <input type="text" />
    </div> */}
  </div>
}

export default App
