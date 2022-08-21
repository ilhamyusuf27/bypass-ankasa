const imageObjectToURL = (datas) => {
  const optimizedDatas = datas.map(data => {
    const userImageJSON = JSON.parse(data?.user_image)
    const userImageURL = userImageJSON?.secure_url

    data.user_image = userImageURL
    return data
  })

  return optimizedDatas
}

module.exports = imageObjectToURL
