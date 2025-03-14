import Express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import multer from "multer";

const port = process.env.PORT || 4000;

var app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(cors({
  origin: "https://sjhomecare.netlify.app",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization"
}));

var CONNECTION_STRING = process.env.DB_URL;
var DATABASENAME = "homecare";

var database;

async function connectDB() {
  try {
    const client = await MongoClient.connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    database = client.db(DATABASENAME);
    console.log("Database connection established!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server Running!");
  });
});

app.get("/testimonials", async (req, res) => {
  if (!database) return res.status(500).json({ error: "Database not connected" });

  try {
    const result = await database.collection("testimonials").find({}).toArray();
    res.json(result);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ error: "Failed to retrieve testimonials" });
  }
});

app.post("/testimonials", multer().none(), async (req, res) => {
  if (!database) return res.status(500).json({ error: "Database not connected" });

  try {
    const numOfDocs = await database.collection("testimonials").countDocuments();
    await database.collection("testimonials").insertOne({
      id: (numOfDocs + 1).toString(),
      title: req.body.title,
    });
    res.json("Added Successfully");
  } catch (error) {
    console.error("Error adding testimonial:", error);
    res.status(500).json({ error: "Failed to add testimonial" });
  }
});

app.put("/testimonials", async (req, res) => {
  if (!database) return res.status(500).json({ error: "Database not connected" });

  try {
    const id = req.query.id;
    const { name, testimonial, image } = req.body;

    const result = await database.collection("testimonials").updateOne(
      { _id: new ObjectId(id) }, 
      { $set: { name, testimonial, image } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Testimonial not found or unchanged" });
    }

    res.json({ success: true, message: "Updated successfully" });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    res.status(500).json({ error: "Failed to update testimonial" });
  }
});

app.delete("/testimonials", async (req, res) => {
  if (!database) return res.status(500).json({ error: "Database not connected" });

  try {
    const result = await database.collection("testimonials").deleteOne({
      id: req.query.id,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No matching testimonial found" });
    }

    res.json("Deleted successfully!");
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
});

app.post("/login", async (req, res) => {
  if (!database) return res.status(500).json({ error: "Database not connected" });

  try {
    const user = await database.collection("users").findOne({
      username: req.body.username
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    if (user.password !== req.body.password) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    res.json({ success: true, message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

