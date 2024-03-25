import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import express from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const port = 3000;
const uri =
  "mongodb+srv://asad:LcKJMBT6krGoMnt0@wispi.sy0u7sr.mongodb.net/?retryWrites=true&w=majority&appName=Wispi";
const app = express();

// Set up CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.static("./public"));

// Set up session management
app.use(
  session({
    secret: "ineedtochangethis",
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1 week
    resave: true,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  console.log("Session: ", req.session);
  next();
});

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

const db = client.db("Wispi");
const usersCollection = db.collection("users");
const wispisCollection = db.collection("wispis");

async function run() {
  try {
    await client.connect();
    startServer();
    setupRoutes();
  } catch (e) {
    await client.close();
    console.error(e);
  }
}

function startServer() {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

function setupRoutes() {
  app.post("/api/signup", async (req, res) => {
    console.log("Signup request received", req.body);
    try {
      const { email, fullName, username, password } = req.body;
      const errors = [];

      // Check if the email already exists
      const existingEmailUser = await usersCollection.findOne({ email });
      if (existingEmailUser) {
        errors.push("Email already exists");
      }

      // Check if the username already exists
      const existingUsernameUser = await usersCollection.findOne({ username });
      if (existingUsernameUser) {
        errors.push("Username already exists");
      }

      if (errors.length > 0) {
        res.status(400).json({ success: false, message: errors.join(", ") });
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = {
        email,
        fullName,
        username,
        password: hashedPassword,
        bio: "",
        profilePicture: "./database/user_pfp/default.svg",
        following: [],
        followers: [],
        accountCreated: new Date(),
      };

      // Save the user to the database
      const result = await usersCollection.insertOne(newUser);
      console.log("Signup successful:", result);

      // Create a session for the user
      req.session.userId = result.insertedId;
      req.session.username = username;
      req.session.loginTime = new Date();
      console.log("session Id: ", req.session.userId); // to remove

      // Save the session data
      req.session.save((err) => {
        if (err) {
          console.error("Error saving session:", err);
          return res.status(500).json({
            success: false,
            message: "An error occurred during signup",
          });
        }

        res.status(200).json({ success: true, message: "Signup successful" });
      });
    } catch (error) {
      console.error("Error during signup:", error);
      res
        .status(500)
        .json({ success: false, message: "An error occurred during signup" });
    }
  });

  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    // Find the user with the given username or email
    const user = await usersCollection.findOne({
      $or: [{ username }, { email: username }],
    });

    if (user) {
      // Compare the provided password with the hashed password in the database
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        // Create a session for the user
        req.session.userId = user._id;
        req.session.username = username;
        req.session.loginTime = new Date();
        console.log("session Id: ", req.session.userId); // to remove

        // Save the session data
        req.session.save((err) => {
          if (err) {
            console.error("Error saving session:", err);
            return res.status(500).json({
              success: false,
              message: "An error occurred during login",
            });
          }

          res.status(200).json({ success: true, message: "Login successful" });
        });
      } else {
        res.status(400).json({ success: false, message: "Incorrect password" });
      }
    } else {
      res.status(400).json({ success: false, message: "User not found" });
    }
  });

  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Failed to log out.");
      }

      res.status(200).send("Logged out successfully.");
      console.log("Logged out successfully");
    });
  });

  // Middleware to check if the session exists
  app.use((req, res, next) => {
    if (req.session) {
      console.log("Session exists");
    } else {
      console.log("Session does not exist");
    }
    next();
  });

  // Middleware to check if the user is logged in
  app.use((req, res, next) => {
    if (req.session.userId) {
      console.log("User is logged in");
    } else {
      console.log("User is not logged in");
    }
    next();
  });

  // Add this route
  app.get("/api/isLoggedIn", (req, res) => {
    if (req.session.userId) {
      res.json(true);
    } else {
      res.json(false);
    }
  });

  // Middleware to redirect logged in users
  app.use(["/api/login", "/api/signup"], (req, res, next) => {
    if (req.session.userId) {
      res.redirect("#/feed"); // Redirect to the home page
    } else {
      next();
    }
  });

  // Endpoint to get the current user's details
  app.get("/api/user/me", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ success: false, message: "Not logged in" });
    }

    const user = await usersCollection.findOne({
      _id: new ObjectId(req.session.userId),
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json(user);
  });

  // Endpoint to get a specific user's details by their username
  app.get("/api/user/:username", async (req, res) => {
    const user = await usersCollection.findOne({
      username: req.params.username,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json(user);
  });

  app.get("/api/search-users", async (req, res) => {
    const searchTerm = req.query.term;
    console.log(`Search term: ${searchTerm}`);

    const users = await usersCollection
      .find({
        $or: [
          { username: { $regex: new RegExp(searchTerm, "i") } },
          { fullName: { $regex: new RegExp(searchTerm, "i") } },
        ],
      })
      .toArray();

    console.log(`Found ${users.length} users`);
    res.json(users);
  });

  // Configure multer for file uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/database/user_pfp/");
    },
    filename: (req, file, cb) => {
      const username = req.session.username;
      const ext = path.extname(file.originalname);
      cb(null, `${username}${ext}`);
    },
  });
  const upload = multer({ storage });

  app.post(
    "/api/update-profile",
    upload.single("profile-picture"),
    async (req, res) => {
      // Check if the user is logged in
      if (!req.session.userId) {
        res.status(401).json({ success: false, message: "Not logged in" });
        return;
      }

      try {
        const { bio } = req.body;
        const userId = req.session.userId;
        const username = req.session.username;

        // Update the user's profile picture if a file was uploaded
        let profilePicture;
        if (req.file) {
          const { filename, path: filePath } = req.file;
          profilePicture = `/database/user_pfp/${filename}`;

          // Update the user's profile picture in the database
          await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { profilePicture } }
          );
        }

        // Update the user's bio in the database
        await usersCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { bio } }
        );

        res
          .status(200)
          .json({ success: true, message: "Profile updated successfully" });
      } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({
          success: false,
          message: "An error occurred while updating the profile",
        });
      }
    }
  );

  app.post("/api/follow", async (req, res) => {
    // Check if the user is logged in
    if (!req.session.userId) {
      res.status(401).json({ success: false, message: "Not logged in" });
      return;
    }

    // Get the user ID of the user to follow from the request body
    const { userId } = req.body;
    const followerId = req.session.userId;

    try {
      // Find the user to follow
      const userToFollow = await usersCollection.findOne({
        _id: new ObjectId(userId),
      });

      if (!userToFollow) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      // Check if the user is already following the user
      const isFollowing = userToFollow.followers.includes(followerId);

      if (isFollowing) {
        // If the user is already following the user, unfollow them
        await usersCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $pull: { followers: followerId } }
        );
        await usersCollection.updateOne(
          { _id: new ObjectId(followerId) },
          { $pull: { following: userId } }
        );
        return res.json({ success: true, message: "follow" });
      } else {
        // If the user is not following the user, follow them
        await usersCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $push: { followers: followerId } }
        );
        await usersCollection.updateOne(
          { _id: new ObjectId(followerId) },
          { $push: { following: userId } }
        );
        return res.json({ success: true, message: "following" });
      }
    } catch (error) {
      console.error("Error following user:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while following the user",
      });
    }
  });

  app.get("/api/follow-status/:userId", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ success: false, message: "Not logged in" });
    }

    const { userId } = req.params;
    const followerId = req.session.userId;

    try {
      const userToCheck = await usersCollection.findOne({
        _id: new ObjectId(userId),
      });

      if (!userToCheck) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const isFollowing = userToCheck.followers.includes(followerId);
      const followStatus = isFollowing ? "following" : "follow";

      res.json({ success: true, followStatus });
    } catch (error) {
      console.error("Error fetching follow status:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching the follow status",
      });
    }
  });

  app.post("/api/submit-wispi", async (req, res) => {
    // Check if the user is logged in
    if (!req.session.userId) {
      res.status(401).json({ success: false, message: "Not logged in" });
      return;
    }

    // Get form data from request body
    const formData = req.body;

    // Add user's ID, username, and creation time to the form data
    const dataToUpload = {
      ...formData,
      userId: req.session.userId,
      username: req.session.username,
      createdAt: new Date(),
      likes: [],
      reposts: [],
    };

    try {
      // Insert the data into wispisCollection
      const result = await wispisCollection.insertOne(dataToUpload);

      // Send success response back to client
      res
        .status(200)
        .json({ success: true, message: "Form data uploaded successfully" });
    } catch (error) {
      console.error("Error uploading form data:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while uploading form data",
      });
    }
  });

  app.get("/api/get-wispis", async (req, res) => {
    try {
      const wispis = await wispisCollection
        .aggregate([
          {
            $lookup: {
              from: "users",
              localField: "username",
              foreignField: "username",
              as: "user",
            },
          },
          {
            $unwind: "$user",
          },
          {
            $project: {
              username: 1,
              wispiContent: 1,
              author: 1,
              source: 1,
              createdAt: 1,
              likes: 1,
              reposts: 1,
              profilePicture: "$user.profilePicture",
            },
          },
          {
            $sort: { createdAt: -1 },
          },
        ])
        .toArray();

      res.json(wispis);
    } catch (error) {
      console.error("Error getting posts:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while getting posts",
      });
    }
  });

  app.get("/api/get-followed-wispis", async (req, res) => {
    // Check if the user is logged in
    if (!req.session.userId) {
      res.status(401).json({ success: false, message: "Not logged in" });
      return;
    }

    try {
      const user = await usersCollection.findOne({
        _id: new ObjectId(req.session.userId),
      });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const wispis = await wispisCollection
        .aggregate([
          {
            $match: {
              userId: { $in: user.following },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "username",
              foreignField: "username",
              as: "user",
            },
          },
          {
            $unwind: "$user",
          },
          {
            $project: {
              username: 1,
              wispiContent: 1,
              author: 1,
              source: 1,
              createdAt: 1,
              likes: 1,
              reposts: 1,
              profilePicture: "$user.profilePicture",
            },
          },
          {
            $sort: { createdAt: -1 },
          },
        ])
        .toArray();

      res.json(wispis);
    } catch (error) {
      console.error("Error getting followed posts:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while getting followed posts",
      });
    }
  });

  app.get("/api/search-posts", async (req, res) => {
    try {
      const { term } = req.query;
      const regex = new RegExp(term, "i"); // 'i' makes it case insensitive

      const wispis = await wispisCollection
        .aggregate([
          {
            $match: {
              $or: [
                { username: { $regex: regex } },
                { name: { $regex: regex } },
                { author: { $regex: regex } },
                { source: { $regex: regex } },
                { wispiContent: { $regex: regex } },
              ],
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "username",
              foreignField: "username",
              as: "user",
            },
          },
          {
            $unwind: "$user",
          },
          {
            $project: {
              username: 1,
              wispiContent: 1,
              author: 1,
              source: 1,
              createdAt: 1,
              likes: 1,
              reposts: 1,
              profilePicture: "$user.profilePicture",
            },
          },
          {
            $sort: { createdAt: -1 },
          },
        ])
        .toArray();

      res.json(wispis);
    } catch (error) {
      console.error("Error searching posts:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while searching posts",
      });
    }
  });

  app.post("/api/like", async (req, res) => {
    // Check if the user is logged in
    if (!req.session.userId) {
      res.status(401).json({ success: false, message: "Not logged in" });
      return;
    }

    // Get the wispi ID and user ID from the request body
    const { wispiId } = req.body;
    const userId = req.session.userId;

    try {
      // Find the wispi document by its ID
      const wispi = await wispisCollection.findOne({
        _id: new ObjectId(wispiId),
      });

      if (!wispi) {
        return res
          .status(404)
          .json({ success: false, message: "Wispi not found" });
      }

      // Check if the user has already liked the wispi
      const userHasLiked = wispi.likes.includes(userId);

      if (userHasLiked) {
        // If the user has already liked the wispi, remove their like
        await wispisCollection.updateOne(
          { _id: wispi._id },
          { $pull: { likes: userId } }
        );
        return res.json({ success: true, message: "Wispi unliked" });
      } else {
        // If the user hasn't liked the wispi, add their like
        await wispisCollection.updateOne(
          { _id: wispi._id },
          { $push: { likes: userId } }
        );
        return res.json({ success: true, message: "Wispi liked" });
      }
    } catch (error) {
      console.error("Error liking wispi:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while liking the wispi",
      });
    }
  });

  app.get("/api/hasLiked/:wispiId", async (req, res) => {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.json({ hasLiked: false });
    }

    const { wispiId } = req.params;
    const userId = req.session.userId;

    const wispi = await wispisCollection.findOne({
      _id: new ObjectId(wispiId),
    });

    if (!wispi) {
      return res.json({ hasLiked: false });
    }

    const hasLiked = wispi.likes.includes(userId);
    res.json({ hasLiked });
  });

  app.post("/api/repost", async (req, res) => {
    // Check if the user is logged in
    if (!req.session.userId) {
      res.status(401).json({ success: false, message: "Not logged in" });
      return;
    }

    // Get the wispi ID and user ID from the request body
    const { wispiId } = req.body;
    const userId = req.session.userId;

    try {
      // Find the wispi document by its ID
      const wispi = await wispisCollection.findOne({
        _id: new ObjectId(wispiId),
      });

      if (!wispi) {
        return res
          .status(404)
          .json({ success: false, message: "Wispi not found" });
      }

      // Check if the user has already reposted the wispi
      const userHasReposted = wispi.reposts.includes(userId);

      if (userHasReposted) {
        // If the user has already reposted the wispi, remove their repost
        await wispisCollection.updateOne(
          { _id: wispi._id },
          { $pull: { reposts: userId } }
        );
        return res.json({ success: true, message: "Wispi un-reposted" });
      } else {
        // If the user hasn't reposted the wispi, add their repost
        await wispisCollection.updateOne(
          { _id: wispi._id },
          { $push: { reposts: userId } }
        );
        return res.json({ success: true, message: "Wispi reposted" });
      }
    } catch (error) {
      console.error("Error reposting wispi:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while reposting the wispi",
      });
    }
  });

  app.get("/api/hasReposted/:wispiId", async (req, res) => {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.json({ hasReposted: false });
    }

    const { wispiId } = req.params;
    const userId = req.session.userId;

    const wispi = await wispisCollection.findOne({
      _id: new ObjectId(wispiId),
    });

    if (!wispi) {
      return res.json({ hasReposted: false });
    }

    const hasReposted = wispi.reposts.includes(userId);
    res.json({ hasReposted });
  });
}

run();
