import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import validator from 'validator'
import listEndpoints from 'express-list-endpoints'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'invalid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 12
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
    unique: true
  }
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

const port = process.env.PORT || 8080
const app = express()


const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: request.header('Authorization') });

  if (user) {
    req.user = user;
    next();
  } 
  else {
    res.status(401).json({ message: 'Sorry, authentication failed' });
  }
};


app.use(cors())
app.use(bodyParser.json())


app.use((request, response, next) => {
  if (mongoose.connection.readyState === 1) {
    next()
  } 
  else {
    response.status(503).json({ error: 'Service unavailable' })
  }
});


app.get('/', (req, res) => {
  if (res) {
    res.status(200).send(listEndpoints(app))
  } else {
    res.status(404).send("No endpoints found.")
  }
});


app.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const user = await new User({
      username,
      email,
      password,
    }).save();

    res.status(200).json({ userID: user._id });
  }
  catch (err) {
    res.status(400).json({ message: 'Sorry, could not create user', errors: err }); 
  }
});


app.post('/sessions', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ userId: user._id, accessToken: user.accessToken }); 
    } 
    else {
      throw 'Incorrect username or password';
    }
  } catch (err) {
    res.status(404).json({ error: 'Sorry, user does not exist' });
  }
});


app.get('/sessions/:id/userMessage', authenticateUser);

app.get('/sessions/:id/userMessage', (req, res) => {
  const userMessage = `Welcome, ${req.user.username}, you're now logged in!`
  res.status(201).json(userMessage)
});

app.get('sessions/:id', (req, res) => {
  res.status(501).send();
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
}) 