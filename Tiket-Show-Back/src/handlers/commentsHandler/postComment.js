//Handler
const commentPut = require('../../controllers/commentControllers/modifComentController');

const respComments = async (req, res) => {
  const { email } = req.params;
  const { body, date, stars } = req.body;
  try {
    const putComment = await commentPut(email, body, date, stars);
    res.status(200).json(putComment);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = respComments;
