import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { instance as axios } from 'boot/axios'

export default function () {
  const $q = useQuasar()
  const $route = useRoute()
  const $router = useRouter()
  const $store = useStore()
  function getBase64 (file, callback, callbackError) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      callback(reader.result)
    }
    reader.onerror = function (error) {
      callbackError(error)
    }
  }

  function emptyErrorMessage (errorMessage) {
    for (const index in errorMessage) {
      errorMessage[index] = ''
    }
  }

  function downloadURI (uri, name) {
    const link = document.createElement('a')
    link.download = name
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function getErrorMessage (baseErrorMessage, errorMessage) {
    for (const index in errorMessage) {
      if (errorMessage[index]) {
        baseErrorMessage[index] = errorMessage[index]
      } else {
        baseErrorMessage[index] = ''
      }
    }
    return baseErrorMessage
  }

  function showNotificationMessage (
    message = 'Message',
    color = 'negative',
    icon = 'error',
    position = 'top'
  ) {
    if (typeof message === 'string') {
      const tmp = document.createElement('DIV')
      tmp.innerHTML = message
      message = tmp.textContent || tmp.innerText || ''
      $q.notify({
        color,
        position,
        message,
        icon
      })
    } else if (typeof message === 'object') {
      const messageObj = message
      let messageItem = ''
      let idx = 0
      let idx2 = 0
      if (typeof messageObj[Object.keys(messageObj)[0]] === 'string') {
        for (idx in messageObj) {
          messageItem = messageObj[idx]
          if (messageItem !== '') {
            $q.notify({
              color,
              position,
              message: messageItem,
              icon
            })
          }
        }
      }
      if (
        (typeof messageObj.data !== 'undefined' &&
          typeof messageObj.data.message !== 'undefined') ||
        typeof messageObj.data_language !== 'undefined'
      ) {
        if (
          typeof messageObj.data_language !== 'undefined' &&
          ((Array.isArray(messageObj.data_language) &&
            messageObj.data_language.length > 0) ||
            (typeof messageObj.data_language === 'object' &&
              Object.keys(messageObj.data_language).length > 0))
        ) {
          const messageDataLanguageObj = messageObj.data_language
          for (idx in messageDataLanguageObj) {
            if (
              typeof messageDataLanguageObj[idx] !== 'undefined' &&
              ((Array.isArray(messageDataLanguageObj[idx]) &&
                messageDataLanguageObj[idx].length > 0) ||
                (typeof messageDataLanguageObj[idx] === 'object' &&
                  Object.keys(messageDataLanguageObj[idx]).length > 0))
            ) {
              for (idx2 in messageDataLanguageObj[idx]) {
                messageItem = messageDataLanguageObj[idx][idx2]
                if (messageItem !== '') {
                  $q.notify({
                    color,
                    position,
                    message: messageItem,
                    icon
                  })
                }
              }
            }
          }
        }
        if (typeof messageObj.data !== 'undefined') {
          const messageDataObj = messageObj.data
          for (idx in messageDataObj) {
            messageItem = messageDataObj[idx]
            if (messageItem !== '') {
              $q.notify({
                color,
                position,
                message: messageItem,
                icon
              })
            }
          }
        }
      }
    }
  }
  return {
    $q,
    $route,
    $router,
    $store,
    axios,

    emptyErrorMessage,
    showNotificationMessage,
    getErrorMessage,
    getBase64,
    downloadURI
  }
}
