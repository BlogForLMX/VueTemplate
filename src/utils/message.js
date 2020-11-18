/**
 * 提示信息工具类
 */
import {
  Message,
  Notification
} from 'element-ui'

/**
 * 成功提示信息
 * @param {String} message 传入的提示信息
 * @param {Boolean} closeFlag 是否关闭的标志
 * @param {Number} duration 显示时间
 */
export function successMessage(message, closeFlag = true, duration) {
  if (closeFlag === null || closeFlag === undefined) {
    closeFlag = true
  }
  if (duration == null) {
    duration = 3000
  }
  Message({
    showClose: closeFlag,
    message: message,
    type: 'success',
    dangerouslyUseHTMLString: true,
    duration: duration
  })
}

/**
 * 错误提示信息
 * @param {String} message 传入的提示信息
 * @param {Boolean} closeFlag 是否关闭的标志
 * @param { Number} duration 显示时间
 */
export function errorMessage(message, closeFlag = true, duration) {
  if (closeFlag === null || closeFlag === undefined) {
    closeFlag = true
  }
  if (duration == null) {
    duration = 3000
  }
  Message({
    showClose: closeFlag,
    message: message,
    type: 'error',
    dangerouslyUseHTMLString: true,
    duration: duration,
    customClass: 'message-style'
  })
}

/**
 * 警告提示信息
 * @param {String} message 传入的提示信息
 * @param {Boolean} closeFlag 是否关闭的标志
 * @param { Number} duration 显示时间
 */
export function warningMessage(message, closeFlag = true, duration) {
  if (closeFlag === null || closeFlag === undefined) {
    closeFlag = true
  }
  if (duration == null) {
    duration = 3000
  }
  Notification({
    showClose: closeFlag,
    message: message,
    type: 'warning',
    dangerouslyUseHTMLString: true,
    duration: duration,
    position: 'bottom-right',
    offset: 55
  })
}

/**
 * 一般提示信息
 * @param {String} message 传入的提示信息
 * @param {Boolean} closeFlag 是否关闭的标志
 * @param { Number} duration 显示时间
 */
export function infoMessage(message, closeFlag = true, duration) {
  if (closeFlag === null || closeFlag === undefined) {
    closeFlag = true
  }
  if (duration == null) {
    duration = 3000
  }
  Message({
    showClose: closeFlag,
    message: message,
    type: 'info',
    dangerouslyUseHTMLString: true,
    duration: duration,
    customClass: 'message-style'
  })
}
