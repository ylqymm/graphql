import gql from "graphql-tag";     //graphql-tag用于解析GraphQL查询
const createDataGql = gql `
    mutation createUser($argsMutify:MutifyUser) {
    createUser(argsMutify:$argsMutify){
        name,
        age,
        status,
        msg,
        id
    }
}
`;
const updateDataGql = gql `
    mutation updateUser($argsMutify:MutifyUser) {
    updateUser(argsMutify:$argsMutify){
        name,
        age,
        status,
        msg
    }
}
`;
const deleteDataGql = gql `
    mutation deleteUser($id:String) {
    deleteUser(id:$id){
        name,
        age,
        id,
        status,
        msg
    }
}
`;
export {
  createDataGql,
  updateDataGql,
  deleteDataGql
};
