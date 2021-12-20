const axios = require('axios')

async function getAllArticles() {
  const recordsPerQuery = 100
  let recordsToSkip = 0
  let makeNewQuery = true
  let articles = []

  while(makeNewQuery) {
    try {
      const response = await axios({
        url: "http://localhost:1337/graphql",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }, 
        data: {
          query: `{
            articles {
              data {
                attributes {
                  title
                  body
                  date
                  slug
                }
              }
            }
          }`
        }
      })

      if(response.errors) {
        let errors = response.errors
        errors.map((error) => console.log(error.message))
        throw new Error("Houston, fuck off there is an error")
      }

      articles = articles.concat(response.data.data.articles.data)
      console.log(articles.length)
      recordsToSkip += recordsPerQuery 
      if(response.data.data.articles.data.length < recordsPerQuery) {
        makeNewQuery = false
      }

    } catch (error) {
      throw new Error(error)
    }
  }

  const articlesFormatted = articles.map((item) => {
    // console.log(item)
    return {
      title: item.attributes.title,
      body: item.attributes.body,
      date: item.attributes.date,
      slug: item.attributes.slug
    }
  })

  // console.log(articlesFormatted)
  return articlesFormatted
}

module.exports = getAllArticles
