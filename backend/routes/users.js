const router = require('express').Router();
const bcrypt = require('bcryptjs'); // why bcryptjs is used
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/user.model');

// register a user
// test in insomina with http://localhost:4000/users/register
// explain async await / promises
router.post('/register', async (req, res) => {
  // use log to make sure you hit the route
  // console.log('yo');

  try {
    let { email, password, passwordCheck, displayName } = req.body;
    // insomnia - if you forget the password check... show validation working
    // console.log(req.body);
    // validate
    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: 'Not all fields have been entered.' });

    if (password.length < 5)
      // show this not working in validation
      return (
        res
          // explain why 400 status error
          // https://httpstatuses.com/
          .status(400)
          .json({ msg: 'The password needs to be at least 5 characters long.' })
      );

    // passwords must match
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: 'Enter the same password twice for verification.' });

    // search if user email exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser)
      // email exists, let user know
      return res
        .status(400)
        .json({ msg: 'An account with this email already exists.' });

    // no display name? use the email as the display name
    if (!displayName) displayName = email;

    // encrypt the password
    // salt
    const salt = await bcrypt.genSalt();
    // hash pwd
    const passwordHash = await bcrypt.hash(password, salt);

    // create a new user (using the User model)
    const newUser = new User({
      email, // explain es6 key/value shortcut
      password: passwordHash,
      displayName,
    });

    // use mongoose save method
    // two step process
    const savedUser = await newUser.save();
    // https://i.imgur.com/4NysKdy.png (show what user in mongodb looks like)
    // return the user created as json to the client
    res.json(savedUser);
  } catch (err) {
    // if we get here we have a server error and let the user know
    res.status(500).json({ error: err.message });
  }
});

// login user
// we have to register and then login to generate a token (better to do it in one step)
router.post('/login', async (req, res) => {
  try {
    // grab the email and password
    const { email, password } = req.body;

    // validate
    // make sure the email and password were entered
    if (!email || !password)
      return res.status(400).json({ msg: 'Not all fields have been entered.' });

    // find user by email
    const user = await User.findOne({ email: email });

    // did we find a user?
    if (!user)
      // no so let the user know
      // better more secure message is possible here
      return res
        .status(400)
        .json({ msg: 'No account with this email has been registered.' });

    // use bcrypt to make sure the password matches
    const isMatch = await bcrypt.compare(password, user.password);

    // if password doesn't match let user know (better way to make this message secure)
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' });

    // use the secret to create the jwt
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // log out the token to test with it
    // console.log(token);
    // send the jwt token back to the client
    res.json({
      token,
      // we send the user id and display name to the client
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    // if we get here and there is an error let user know the server is the problem
    res.status(500).json({ error: err.message });
  }
});

// delete
// http://localhost:4000/users/delete
// we need to be logged in so we can use the auth middleware
router.delete('/delete', auth, async (req, res) => {
  try {
    // console.log(req.user);
    // find the user in the request
    // use mongoose method to find and delete the user (by the user object we send it - will be the user object in the request object)
    const deletedUser = await User.findByIdAndDelete(req.user);
    // send the user deleted back to the client
    res.json(deletedUser);
    // test to show it works but if you try to run it again you will server error
    // the user is null because they no longer exist
  } catch (err) {
    // let user know if we get here there is a server error (and show error message)
    res.status(500).json({ error: err.message });
  }
});

// check if token is valid
// http://localhost:4000/users/tokenIsValid
router.post('/tokenIsValid', async (req, res) => {
  try {
    // check header for token
    const token = req.header('x-auth-token');
    // no token return to client with false
    if (!token) return res.json(false);

    // if we have a token verify it
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // if not verified return to client false
    if (!verified) return res.json(false);

    // if we find the user's verified id store it in the user object
    const user = await User.findById(verified.id);

    // if we don't have a user return to the client false
    if (!user) return res.json(false);

    // if all is good and we have a verified user return to the client true
    return res.json(true);
  } catch (err) {
    // server error
    res.status(500).json({ error: err.message });
  }
});

// http://localhost:4000/users/
router.get('/', auth, async (req, res) => {
  // find the user that is currenlty logged in
  const user = await User.findById(req.user);

  // return to the client the user display name and id
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});

// make sure to export the router so it can be used elsewhere in this app
module.exports = router;
