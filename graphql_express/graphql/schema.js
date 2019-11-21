const {
    gql
} = require('apollo-server-express');
module.exports = gql `
    type Test{
        name:String,
        title:String,
        pass:String,
        id:String,
        details:String
    }
    type Detail{ 
        name:String,
        age:Int,
        sex:String,
        address:String,
        testId:String,
        id:String
    }
    
    type User{
        name:String,
        age:Int,
        id:String,
        status:String,
        msg:String,
        # posts:[Post],
        # comments:[Comment]
    }
    type Post{
        title: String,
        content: String,
        id:String,
        author:User,
        msg:String,
        status:String,
        # comments:[Comment],
    }
    type Comment{
        content: String,
        author: String
    }
    type Query {
        getTest: [Test],
        getTestID(id:String):[Test],
        getDetail:[Detail],
        getUser:[User],
        getPost(author:String):Post
    }

    type Mutation{
        createTest(name:String):Test
        createTestMutify(argsMutify:MutifyTest):Test
        createDetailMutify(argsMutify:MutifyDetail):Detail
        createUser(argsMutify:MutifyUser):User
        createPost(argsMutify:MutifyPost):Post
        updateUser(argsMutify:MutifyUser):User
        deleteUser(id:String):User
    }
    input MutifyTest{
        name:String,
        title:String,
        pass:String,
        id:String,
        details:String
    }
    input MutifyDetail{
        name:String,
        age:Int,
        sex:String,
        address:String,
        testId:String,
        id:String
    }
    input MutifyUser{
        name:String,
        age:Int,
        id:String,
        # status:String,
        # msg:String,
        # posts:[String],
        # comments:[String],
    }
    input MutifyPost{
        title: String,
        content: String,
        author:String,
        # status:String,
        # msg:String,
        # comments:[String]
    }
`;