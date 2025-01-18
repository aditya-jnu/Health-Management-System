require('dotenv').config();

const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const sid = process.env.TWILIO_ACCOUNT_SID;
const key = process.env.TWILIO_API_KEY;
const secret = process.env.TWILIO_API_SECRET;

function createToken(identity, room) {
  const token = new AccessToken(
    sid,
    key,
    secret,
    { identity: identity } // Pass identity directly here
  );

  // Grant the access token Twilio Video capabilities
  const grant = new VideoGrant();
  grant.room = room; // Assign the room to the grant
  token.addGrant(grant);

  // Serialize the token to a JWT string
  return token.toJwt();
}

module.exports = createToken;
