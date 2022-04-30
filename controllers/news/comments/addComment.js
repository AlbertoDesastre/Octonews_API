const getDB = require("../../../database/config");
const { addCommentSchema } = require("../../../validators/newsValidators");

const addComment = async (req, res, next) => {
  let connection;
  try {
    connection = await getDB();

    await addCommentSchema.validateAsync(req.body);

    const { comment } = req.body;
    const { idNews } = req.params;

    //Insert comment associating idUser and idNews

    const [result] = await connection.query(
      `INSERT INTO news_comments (comment, creation_date,id_news,id_user)
       VALUES (?,UTC_TIMESTAMP,?,?);`,
      [comment, Number(idNews), req.user.id]
    );

    // send result

    res.send({
      status: "ok",
      data: {
        id: result.insertId,
        comment,
        id_news: Number(idNews),
        id_user: req.user.id,
      },
    });
  } catch (error) {
    //if there is an error, we send it to the next middleware/function
    //eventually the checkErrors function will handle it.
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  addComment,
};