const pool = require("../../utils/database");
const jwt = require("jsonwebtoken");

// function query table with sql and key
const query = async(sql,key) => {
  return new Promise((resolve, reject) => {
    pool.query(sql,key, function(err, result, fields) {
      if (err) throw new Error(err);
      resolve(result);
    });
  });
}

const findUser = async(userId) => {
  let sql  = " select * from rb_users where userId=?"
  const results = await query(sql,[userId])
  if (results)
    return results[0]
  else
    return false
}


/// Main //////////=========================================
const handleAction = async (req, res) => {
  try {
      const { userId } = req.body
      if (!userId) {
        res.status(400).send('All userId is required')
      }
      const user = await findUser(userId)
      if (user) {
        const token = jwt.sign(
          {user_id: user.userId},
          process.env.TOKEN_KEY,
          {
            expiresIn: "1m"
          }
        )
        user.token = token
        res.status(200).json({token})
      }
      else {
        res.status(401).json({
            text : "Invalid Credentials"
        })
      }

    } catch (err) {
      console.log(err)
    }


}

module.exports = handleAction
