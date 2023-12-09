const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@assignment12.130rwa2.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const membershipCollection = client
      .db("devPointDB")
      .collection("membership");
    const postCollection = client.db("devPointDB").collection("posts");
    const announcementCollection = client
      .db("devPointDB")
      .collection("announcement");
    const userCollection = client
      .db("devPointDB")
      .collection("users");
    const commentCollection = client
      .db("devPointDB")
      .collection("comments");
    const reportCollection = client
      .db("devPointDB")
      .collection("reports");



// jwt related api  ----
app.post('/jwt', async (req, res) => {
  const user =req.body
  const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
  res.send({token})
})

// middlewares*************
const verifyToken = (req, res, next) => {
  console.log(req.headers.authorization);
  // if not authorization ---
  if(!req.headers.authorization){
    return res.status(401).send({message: 'unauthorized access!'})
  }

  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err){
      return res.status(401).send({message: 'unauthorized access!'})
    }
    req.decoded = decoded
    next()
  })


  // next()
}

// payment -----------
// app.post('/create-payment-intent', async (req, res) => {
//   try {
//     const { price } = req.body;
//     if (!price || isNaN(price)) {
//       return res.status(400).send({ error: 'Invalid price' });
//     }

//     const amount = parseInt(price * 100);

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: 'usd',
//       payment_method_types: ['card']
//     });

//     res.send({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error('Error creating payment intent:', error);
//     res.status(500).send({ error: 'Error creating payment intent' });
//   }
// });





app.put('/make-admin', async (req, res) => {
  const id = req.query.id
  const query = {_id: new ObjectId(id)}
  const {newRole} = req.body
  const result = await userCollection.updateOne(query, { $set: { role: newRole } })
  res.send(result)
})

// report api ------------
app.post('/report', async (req, res) => {
  const feedback = req.body
  const newReport = await reportCollection.insertOne(feedback)
  res.send(newReport)
})
// get report 
app.get('/report', async (req, res) => {
  const allReport = await reportCollection.find().toArray()
  res.send(allReport)
})
app.delete('/report', async(req, res) => {
  const id = req.query.id
  const query = {_id: new ObjectId(id)}
  const result = await reportCollection.deleteOne(query)
  res.send(result)
})

// comment api ------------------
// post comment ----
app.post('/comment', async (req, res) => {
  const commentData = req.body
  const newComment = await commentCollection.insertOne(commentData)
  res.send(newComment)
})

// post get ---
app.get('/comments', async(req, res) => {
  const comment = await commentCollection.find().toArray()
  res.send(comment)
})

app.get('/comments', async(req, res) => {
  const postId = req.query.postId
  const query = {postId: postId}
  const comment = await commentCollection.find(query).toArray()
  res.send(comment)
})
// // delete comment 
// app.delete('/comments', async(req, res) => {
//   const id = req.query.id
//   const query = {_id: new ObjectId(id)}
//   const result = await commentCollection.deleteOne(query)
//   res.send(result)
// })




// get all user api -----------==========================
app.get('/all-users',verifyToken, async (req, res) => {
  // console.log(req.headers);
  const result = await userCollection.find().toArray()
  res.send(result)
})
// users api ----------------------------------
app.post('/users', async (req, res) => {
  const user = req.body

const query = {email: user.email}
const existUser = await userCollection.findOne(query)
if(existUser){
  return  res.send({message: "User Already Exist Please Login", insertedId: null})
}

  const result = await userCollection.insertOne(user)
  res.send(result)
})

// user get api -----------------------
app.get('/users', async (req, res) => {
  const email = req.query.email
  // console.log(email);
  const query = {email: email}
  const result = await userCollection.findOne(query)
  res.send(result)
})
// user delete api -----------------------
app.delete('/users', async (req, res) => {
  const email = req.query.email
  // console.log(email);
  const query = {email: email}
  const result = await userCollection.deleteOne(query)
  res.send(result)
})



    // voting ================================
    // api  for up voting a post-------------------
    app.put("/posts/:id/upvote", async (req, res) => {
      const { id } = req.params;

      try {
        const result = await postCollection.updateOne(
          { _id: new ObjectId(id) },
          { $inc: { upVote: 1 }, }
        );
        res.send(result);
      } catch (error) {
        console.error("Error up voting post:", error);
        res
          .status(500)
          .json({ success: false, message: "Error up voting post" });
      }
    });
    // api  for up down voting a post-----------------------
    app.put("/posts/:id/downvote", async (req, res) => {
      const { id } = req.params;

      try {
        const result = await postCollection.updateOne(
          { _id: new ObjectId(id) },
          { $inc: { downVote: 1 } }
        );
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Error down voting post" });
      }
    });

    // post api=================================
    // add post ----
    app.post("/add-post", async (req, res) => {
      const post = req.body;
      // console.log(post);
      const addPost = await postCollection.insertOne(post);
      res.send(addPost);
    });

    // all post and searched post api --------------
    app.get("/all-post", async (req, res) => {
      try {
        const tag = req.query.tag;
        let query = {};
        if (tag) {
          query = { tag: { $regex: new RegExp(tag, "i") } };
        }
        const allPost = await postCollection
          .find(query)
          .sort({ postedTime: -1 })
          .toArray();
        res.send(allPost);
      } catch (error) {
        console.error(error);
      }
    });
    // all sorted post api -----------------
    app.get("/sorted-posts", async (req, res) => {
      try {
        const sortedPosts = await postCollection
          .aggregate([
            {
              $addFields: {
                voteDifference: { $subtract: ["$upVote", "$downVote"] },
              },
            },
            {
              $sort: { voteDifference: -1 },
            },
          ])
          .toArray();

        res.send(sortedPosts);
      } catch (error) {
        res.status(500).json({ message: "Error fetching sorted posts" });
      }
    });

    // single post api---------------
    app.get("/single-post/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const post = await postCollection.findOne(query);
      res.send(post);
    });


// my post api  --------
app.get('/my-posts', async (req, res) => {
  const email = req.query.email
  const query = {authorEmail: email}
  const myPost = await postCollection.find(query).sort({ postedTime: -1 }).toArray()
  res.send(myPost)
})

// delete my post ---------
app.delete('/my-post', async (req, res) => {
  const id = req.query.id;
  const query = {_id: new ObjectId(id)}
  const result = await postCollection.deleteOne(query)
  res.send(result)

})




    // announcement api -------------
    app.get("/announcements", async (req, res) => {
      const announcement = await announcementCollection.find().toArray();
      res.send(announcement);
    });
    app.post("/announcements", async (req, res) => {
      const announcement = req.body
      const result = await announcementCollection.insertOne(announcement)
      res.send(result);
    });




    // membership data ---------------------------------
    app.get("/membership", async (req, res) => {
      const membership = await membershipCollection.find().toArray();
      res.send(membership);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Dev Point Server Running!");
});

app.listen(port, () => {
  console.log(`Dev Point Running on port ${port}`);
});
