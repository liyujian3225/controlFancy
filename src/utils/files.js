export const base64ToFile = (base64, fileName) => {
  let arr = base64.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  let blob = new Blob([u8arr], {
    type: mime
  })
  blob.lastModifiedDate = new Date()
  blob.name = fileName
  console.log('functionbase64ToFile -> blob', blob) // file
  return blob
}

// 上传base64
export const uploadFileBase64 = (file, bucketName) => {
  let sendData = {
    strBase64Image: file,
    bucketName: bucketName
  }
  if (loading) {
    loading.close() // 关闭加载
  }
  startLoading() // 开启加载
  return request({
    url: '/filemgr/uploadFileBase64',
    method: 'post',
    data: sendData
  }).then(({ data }) => {
    loading.close() // 关闭加载
    if (data.code === 0) {
      return data.data
    }
  })
}

// 文件下载
export function fileLocalDownLoad(data, fileName) {
  const blob = new Blob(data)
  let downloadElement = document.createElement('a')
  let href = window.URL.createObjectURL(blob)
  downloadElement.href = href
  downloadElement.download = decodeURIComponent(fileName)
  document.body.appendChild(downloadElement)
  downloadElement.click()
  document.body.removeChild(downloadElement)
  window.URL.revokeObjectURL(href)
}















export function  asyncFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      // target.result 该属性表示目标对象的DataURL
      resolve(e.target.result)
    }
  })
}
export function  asyncImage2Base64(file) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = file
    img.onload = function() {
      var canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      var ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
      var dataURL = canvas.toDataURL('image/' + ext)
      resolve(dataURL)
      // console.log(11,dataURL)
    }

  })
}
