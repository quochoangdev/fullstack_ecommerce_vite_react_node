import axios from 'axios';
import db from "../models/index";

const loginGoogleOAuth = async (req, res) => {
  const { code } = req.body;

  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: 'http://localhost:5173',
        grant_type: 'authorization_code',
      },
    });
    res.json(tokenResponse.data);
  } catch (error) {
    if (error.response) {
      console.error('Error Response:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      res.status(error.response.status).send('Error exchanging code for token');
    } else {
      console.error('Error Message:', error.message);
      res.status(500).send('Error exchanging code for token');
    }
  }
};

// save account google oauth to database
const checkEmailExist = async (email) => {
  let user = await db.User.findOne({ where: { email: email, }, });
  if (user) { return true; } return false;
};

const saveAccountGoogleOAuth = async (req, res) => {
  try {
    const { name, email, picture, email_verified } = req?.body?.data;
    if (!name || !email || !picture || !email_verified) {
      return res.status(200).json({ message: "missing required parameters", data: [] });
    }

    let isEmailExist = await checkEmailExist(email);
    if (!isEmailExist) {
      await db.User.create({
        full_name: name,
        email: email,
        avatar: picture,
        is_verified: email_verified,
      });
    }
    return res.status(200).json({ message: "login google successfully!", data: [] });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", data: [] });
  }
}

module.exports = { loginGoogleOAuth, saveAccountGoogleOAuth }
