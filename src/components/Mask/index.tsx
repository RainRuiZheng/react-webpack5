/* eslint-disable */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styles from './style.less'
import preventBgScroll from './preventBgScroll.js'

const classnames = require('classnames')

interface MaskState {
  _preventBgScroll: any
}

export default class Mask extends Component<any, MaskState> {
  componentActivated: boolean

  container: any

  constructor(props: any) {
    super(props)
    this.state = {
      _preventBgScroll: preventBgScroll()
    }
    this.componentActivated = false
  }

  showUpdata = () => {
    if (this.props.show) {
      this.container && this.container.removeEventListener('animationend', this.removeContainer)
      this.state._preventBgScroll.afterOpen()
    } else {
      this.container && this.container.addEventListener('animationend', this.removeContainer)
      this.state._preventBgScroll.beforeClose()
    }
  }

  componentDidMount() {
    this.showUpdata()
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.show !== this.props.show) {
      this.showUpdata()
    }
  }

  removeContainer = () => {
    this.container && this.container.parentNode.removeChild(this.container)
    this.componentActivated = false
    this.container = null
  }

  getContainer = () => {
    if (!this.container) {
      const container = document.createElement('div')
      const containerId = `ost_mask_container_${new Date().getTime()}`
      container.setAttribute('id', containerId)
      document.body.appendChild(container)
      this.container = container
    }
    return this.container
  }

  getComponent = () => {
    const { show, onClick, type } = this.props

    return (
      <div>
        {!type && (
          <div
            className={classnames(styles.ost_mask_default_popup, {
              [styles.ost_mask_show_fade_out]: !show,
              [styles.ost_mask_show_fade_in]: show
            })}
          >
            {this.props.children}
          </div>
        )}
        {
          <div
            className={classnames('', styles.ost_mask, {
              [styles.ost_mask_show_fade_out]: !show,
              [styles.ost_mask_show_fade_in]: show
            })}
            onClick={e => onClick && onClick(e)}
          ></div>
        }
      </div>
    )
  }

  render() {
    const { show } = this.props
    if (show) this.componentActivated = true

    if (!this.componentActivated) return null

    return ReactDOM.createPortal(this.getComponent(), this.getContainer())
  }
}
