import { Component } from 'react'
import Mask from '../Mask/index'
import styles from './style.less'

interface LoadingProps {
  isLoading?: boolean
  loadingText?: string
}

class Loading extends Component<LoadingProps> {
  render() {
    const { isLoading, loadingText } = this.props
    const text = loadingText || '加载中…'
    return (
      <Mask show={isLoading}>
        <div className={styles.loading}>
          <span className={styles.loading_svg}></span>
          <span className={styles.loading_text}>{text}</span>
        </div>
      </Mask>
    )
  }
}

export default Loading
