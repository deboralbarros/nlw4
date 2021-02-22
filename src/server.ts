import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.json({ message: "Hello" })
})

app.post("/", (req, res) => {
    return res.status(200).json({ message: "Os dados foram salvos com sucesso!" })
})


app.listen(3333, () => console.log("Server is running on port 3333!"));
