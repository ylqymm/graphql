var test = require("../models/test");
var detail = require("../models/detail");

var User = require('../models/user');
var Post = require('../models/post');
var Comment = require('../models/comment');

var resolvers = {

    Query: {

        getTest() {
            // return[{
            //     "name":"hello",
            //     "title":"world",
            //     "pass":"123"
            // }]
            return test.find();
        },
        async getTestID(root, args) {
            return await detail.find({
                "testId": args.id
            }).populate("_id").exec();
        },
        getDetail() {
            return detail.find();
        },
        getUser() {
            return User.find();
        },
        async getPost(root, agrs, context) {
            return await Post.findOne({
                    "author": agrs.author
                })
                .populate('author')
            // .then((post) => {
            //     message = post;
            // }).catch(function (reason) {
            //     console.log(reason);
            // });
            // return message;
        }
    },
    Mutation: {
        createTest(root, args) {
            // return args;
            // 对数据库操作
            test.findOne({
                name: args.name
            }).then((data) => {
                if (!data) {
                    test.insertMany(args);
                } else {
                    console.log("该数据已存在！");
                }
            })
            return args;
        },
        createTestMutify(root, {
            argsMutify
        }, context) {
            // console.log('context',context.req);
            //  未连接数据库
            // return argsMutify

            // 对数据库操作
            test.findOne({
                name: argsMutify.name
            }).then((data) => {
                if (!data) {
                    test.insertMany(argsMutify);
                } else {
                    console.log("该数据已存在");
                }
            })

            return argsMutify;
        },
        createDetailMutify(root, {
            argsMutify
        }) {
            test.findOne({
                "name": argsMutify.name
            }).then((dataTest) => {
                console.log(dataTest);
                if (dataTest) {
                    detail.findOne({
                        testId: dataTest._id
                    }).then((data) => {
                        if (!data) {
                            argsMutify.testId = dataTest._id;
                            detail.insertMany(argsMutify);

                        }
                    })
                }

            })

            return argsMutify;
        },
        async createUser(root, {
            argsMutify
        }) {
            let newData = await User.findOne({
                "name": argsMutify.name
            });
            if (!newData) {
                newData = [... await User.insertMany(argsMutify)][0];
                newData.status = 200;
                newData.msg = "增加成功！"
            } else {
                newData={};
                newData.status = 403;
                newData.msg = "增加失败,数据已存在！"
            }
            // let newData = {};
            // await User.findOne({
            //     "name": argsMutify.name
            // }).then(async (dataUser) => {
            //     if (!dataUser) {
            //         await User.insertMany(argsMutify)
            //             .then((data) => {
            //                 newData = data[0];
            //             });
            //         newData.status = 200;
            //         newData.msg = "增加成功！"
            //     } else {
            //         newData.status = 403;
            //         newData.msg = "增加失败，数据已存在！"
            //     }
            // });

            return newData;
        },
        async createPost(root, {
            argsMutify
        }) {
            let newData =await Post.findOne({
                "author": argsMutify.author
            })
            if(!data){
                newData = [... await User.insertMany(argsMutify)][0];
                newData.status = 200;
                newData.msg = "增加成功！"
            }else{
                newData={};
                newData.status = 403;
                newData.msg = "增加失败,数据已存在！"
            }
            
            // let newData = {};
            // await Post.findOne({
            //     "author": argsMutify.author
            // }).then(async (data) => {
            //     if (!data) {
            //         await Post.insertMany(argsMutify).then((dataPost) => {
            //             newData = dataPost[0];
            //         })
            //         newData.status = 200;
            //         newData.msg = "增加成功！"
            //     } else {
            //         newData.status = 403;
            //         newData.msg = "增加失败，数据已存在！"
            //     }
            // })
            return newData;
        },
        async updateUser(root, {
            argsMutify
        }) {
            let newData;
            await User.findByIdAndUpdate({
                _id: argsMutify.id
            }, {
                $set: {
                    name: argsMutify.name,
                    age: argsMutify.age
                }
            }, {
                new: true
            }).then((data) => {
                if (data) {
                    newData = data;
                    newData.status = 200;
                    newData.msg = "编辑成功！"
                } else {
                    newData.status = 403;
                    newData.msg = "编辑失败！"
                }

            })
            return newData
        },
        async deleteUser(root, {
            id
        }) {
            let newData = {};
            await User.deleteOne({
                "_id": id
            }).then((data) => {
                newData.status = 200;
                newData.msg = "删除成功！"
            })
            return newData
        }
    },

}
module.exports = resolvers