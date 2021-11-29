const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // console.log(req);
    // find the token in the header
    const token = req.header('x-auth-token');
    // walk through process of finding token
    // how to set in insomnia
    // https://dev.to/kmcknight91/how-to-use-insomnia-to-test-api-endpoints-1lad
    // we use x-auth-token
    console.log(`this is the token ${token}`);
    if (!token)
      // no token so let user know
      return res
        .status(401)
        .json({ msg: 'No authentication token, access denied' });

    // we have a token so we verify object that token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified)
      // bad token so let user know
      return res
        .status(401)
        .json({ msg: 'Token verification failed, authorization denied' });

    console.log(verified);
    // grab the id off the verified token and set it to the user object on the request
    req.user = verified.id;
    // next() moves us on to next middleware
    next();
  } catch (err) {
    // we get here let the user know the server has a problem
    res.status(500).json({ error: err.message });
  }
};

// export so we can use in other parts of our app
module.exports = auth;
