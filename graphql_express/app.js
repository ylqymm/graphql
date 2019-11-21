var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// apollo-server-express部分
var {
  ApolloServer
} = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolver');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: `/graphql`,
    settings: {
      "editor.theme": "dark"
    }
  },
  // context: ({ req }) => ({

  // })
});
server.applyMiddleware({
  app
});
// app.listen(() =>
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
// );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 连接本地数据库
const urlDev = "mongodb://localhost:27017/data"
mongoose.connect(urlDev, {
  useNewUrlParser: true
})
mongoose.connection.on('connected', function () {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})
mongoose.connection.on('error', function () {
  console.log('出错了');
})
mongoose.connection.on('disconnected', function () {
  console.log('连接断开');
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;