
import { gql } from "@apollo/client"

export const LOAD_WEATHER = gql`
# Write your query or mutation here
query getCityByName($name: String!, $units: Unit!) {
   getCityByName(
       name: $name, 
       config:{units: $units}) {
    id
    name
    country
    coord {
      lon
      lat
    }
    weather {
      summary {
        title
        description
        icon
      }
      temperature {
        actual
        min
        max
      } 
}
}
}
`