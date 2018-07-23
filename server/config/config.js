var env = process.env.NODE_ENV || 'development';
console.log(env)
if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/bookstore';
  process.env.JWT_SECRET  = "poijasdf98435jpgfdpoij3";
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/bookstore';
  process.env.JWT_SECRET  = "poijasdf98435jpgfdpoij3";
}
