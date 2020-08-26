import {gql} from '@apollo/client'


export const blogIndex = gql`
query BlogIndex($indexPath: String) {
  allPages(urlPath: $indexPath) {
    edges {
      node {
        id
        urlPath
        pageType
        children {
          edges {
            node {
              id
              title
              seoTitle
              urlPath
              pageType
              
            }
          }
        }
      }
    }
  }
}
`