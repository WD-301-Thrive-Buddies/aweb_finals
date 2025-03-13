import Express from "express";
import { MongoClient as Mongoclient } from "mongodb";
import cors from "cors";
import multer from "multer";

var app = Express();
app.use(cors());

var CONNECTION_STRING =
  "mongodb+srv://delfinlevin:delfinlevin007@cluster0.0w50x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASENAME = "homecare";

var database;

async function connectDB() {
  try {
    const client = await Mongoclient.connect(CONNECTION_STRING, {
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
  app.listen(() => {
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
