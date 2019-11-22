import gql from "graphql-tag";
const getDataGql=gql`
    { getUser {
        name,
        age,
        id
    }
}

`
export {getDataGql};