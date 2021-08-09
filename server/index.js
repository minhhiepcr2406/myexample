const express = require('express')
const app = express()
const cors = require("cors")
const port = 4000

const pool = require('./db')

//middleware
app.use(cors())
app.use(express.json())

//ROUTES

//NOTIFICATIONS
//create a new notification
app.post("/notifications", async (req, res) => {
    try{
        const {noti_text, date_str} = req.body
        const newNoti = await pool.query("INSERT INTO notifications (noti_text, date_str) VALUES($1, $2) RETURNING *",
        [noti_text, date_str])
        res.json(newNoti.rows[0])      
    }
    catch(error){
        console.log(error.message)
    }
})

//get all notification
app.get("/notifications", async (req, res) => {
  try {
    const allNotifications = await pool.query("SELECT * FROM notifications");
    res.json(allNotifications.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a notification
app.delete("/notifications/:id", async (req, res) => {
  try {
    const { id } = req.params
    const deleteNoti = await pool.query("DELETE FROM notifications WHERE noti_id = $1", [id])
    res.json(`Notification with ${id} deleted!`)
  }
  catch(error) {
    console.log(error.message)
  }
})

//POSTS
//create a new post
app.post('/posts', async (req, res) => {
  try {
    const {text, picture, account, userava, date_str} = req.body
    const newPost = await pool.query("INSERT INTO posts (text, picture, account, userava, date_str) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
    [text, picture, account, userava, date_str])
    res.json(newPost.rows[0])
  }
  catch (error) {
    console.log(error.message)
  }
})
//get all posts
app.get("/posts", async (req, res) => {
  try {
    const allPosts = await pool.query("SELECT * FROM posts");
    res.json(allPosts.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//delete a post
app.delete("/posts/:id", async (req, res) => {
  try {
    const {id} = req.params
    const deleledPost = await pool.query("DELETE FROM posts WHERE post_id = $1", [id])
    res.json(`Post with ${id} deleted!`)
  }
  catch (error) {
    console.log(error.message)
  }
})
//update a post
app.put("/posts/:id", async (req, res) => {
  try {
    const {id} = req.params
    const {_id, text, picture, account, date_str} = req.body
    const updatePost = await pool.query("UPDATE posts SET text = $1 WHERE post_id = $2", [text, id])
    console.log(updatePost)
    res.json({_id, text, picture, account, date_str})
  }
  catch (error) {
    console.log(error.message)
  }
})

//COMMENTS
//get all comments
app.get("/comments/:postId", async (req, res) => {
  try {
    const {postId} = req.params
    const allComments = await pool.query("SELECT * FROM comments WHERE post_id = $1", [postId]);
    res.json(allComments.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//add new comment
app.post('/comments', async (req, res) => {
  try {
    const {text, username, userava, post_id} = req.body
    const newComment = await pool.query("INSERT INTO comments (text, username, userava, post_id) VALUES ($1, $2, $3, $4) RETURNING *", 
    [text, username, userava, post_id])
    res.json(newComment.rows[0])
  }
  catch (error) {
    console.log(error.message)
  }
})

//LECTURES
//get all lectures
app.get("/lectures", async (req, res) => {
  try {
    const allLectures = await pool.query("SELECT * FROM lectures");
    res.json(allLectures.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//add new lectures
app.post('/lectures', async (req, res) => {
  try {
    const {lecture, name, description, date_str} = req.body
    const newLecture = await pool.query("INSERT INTO lectures (lecture, name, description, date_str) VALUES ($1, $2, $3, $4) RETURNING *", 
    [lecture, name, description, date_str])
    res.json(newLecture.rows[0])
  }
  catch (error) {
    console.log(error.message)
  }
})

//USER
app.get('/users/:id', async (req, res) => {
  try{
    const {id} = req.params
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id])
    res.json(user.rows[0])
  }
  catch(error){
    console.log(error.message)
  }
})

//get all user
app.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () =>{
    console.log(`server has started port http://localhost:${port}`)
})