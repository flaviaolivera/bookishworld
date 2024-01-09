const express = require("express");
const app = express();

app.use(express.json());

const db = require("./firebaseConfig");

// GET /books: Devuelve una lista de todos los libros
app.get("/books", async (req, res) => {
  try {
    const booksSnapshot = await db.collection("books").get();
    const books = [];
    booksSnapshot.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() });
    });
    res.json(books);
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).send("Error getting books");
  }
});

// GET /books/{id}: Devuelve los detalles de un libro específico según su ID
app.get("/books/:id", async (req, res) => {
  try {
    const bookDoc = await db.collection("books").doc(req.params.id).get();
    if (!bookDoc.exists) {
      res.status(404).send("Book not found");
    } else {
      res.json({ id: bookDoc.id, ...bookDoc.data() });
    }
  } catch (error) {
    console.error("Error getting book:", error);
    res.status(500).send("Error getting book");
  }
});

// POST /books: Crea un nuevo libro con la información proporcionada
app.post("/books", async (req, res) => {
  try {
    const newBook = await db.collection("books").add(req.body);
    res.status(201).send(`Book created with ID: ${newBook.id}`);
  } catch (error) {
    console.error("Error creating new book:", error);
    res.status(500).send("Error creating new book");
  }
});

// PUT /books/{id}: Actualiza la información de un libro existente según su ID
app.put("/books/:id", async (req, res) => {
  try {
    await db
      .collection("books")
      .doc(req.params.id)
      .set(req.body, { merge: true });
    res.send(`Book with ID: ${req.params.id} updated`);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send("Error updating book");
  }
});

// DELETE /books/{id}: Elimina un libro específico según su ID
app.delete("/books/:id", async (req, res) => {
  try {
    await db.collection("books").doc(req.params.id).delete();
    res.send(`Book with ID: ${req.params.id} deleted`);
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send("Error deleting book");
  }
});

// Define el puerto y pone el servidor a escuchar las peticiones
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log(`Attempting to listen on port ${PORT}`);
