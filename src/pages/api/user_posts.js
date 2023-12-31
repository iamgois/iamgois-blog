import { MongoClient } from 'mongodb';
require('dotenv').config()
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // Todos podem fazer requisição na API

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const mongoUrl = process.env.mongoUrl; // URL do seu servidor MongoDB
      const dbName = process.env.dbName; // Nome do seu banco de dados
      const collectionName = process.env.collectionName; // Nome da coleção no MongoDB

      const client = await MongoClient.connect(mongoUrl);
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      const posts = await collection.find({}).toArray();

      res.status(200).json(posts);
    } catch (error) {
      console.log('Erro ao buscar os posts:', error);
      res.status(500).json({ error: 'Erro ao buscar os posts' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}