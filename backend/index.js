
// Prevent server crashes from unexpected errors


let express=require("express")
let mongodb=require('./mongodb.js')
let app=express()
require('dotenv').config();
let jwtmiddleware=require("./middleware.js/authmiddleware.js")
app.use(express.json({ limit: '50mb' }))
let cors=require('cors')
const morgan = require("morgan");
let cookieparser=require("cookie-parser")
app.use(cookieparser())
const rateLimit = require("express-rate-limit");

// mongodb.mongoconnec().then(() => {
//   console.log("MongoDB connection established at startup.");
// }).catch(err => {
//   console.error("Failed to connect to MongoDB at startup:", err);
// });

// const limiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute window
//   max: 5, // Limit each IP to 5 requests per `windowMs`
//   message: "Too many requests, please try again later.",
// });

// Apply rate limiting to all requests
//app.use(limiter);
const corsOptions = {
  origin: 'http://localhost:4200', // The origin of your Angular app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};



// Use CORS middleware
app.use(cors(corsOptions));
app.use(morgan("dev"));
let mongoose=require("mongoose")

var urii="mongodb+srv://sarath:mongodb@sarath.pwemxqm.mongodb.net/foodonfarm?retryWrites=true&w=majority";

mongoose.connect(urii, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected mongoose'))
.catch((err) => console.error('Could not connect to MongoDB', err));

app.use(jwtmiddleware)
const userrouter = require("./routes/usersroute");
const categoryrouter=require("./routes/categoryroute.js")
const productrouter=require('./routes/productsroute.js')
const wishlistrouter=require("./routes/wishlistroute.js")
const cartrouter=require("./routes/cartroute.js")

app.use('/users',userrouter)
app.use('/category',categoryrouter)

app.use('/products',productrouter)
app.use('/wishlist',wishlistrouter)
app.use('/carts',cartrouter)



app.listen(2000,(err,res)=>{

 console.log("server listening on 2000")
})