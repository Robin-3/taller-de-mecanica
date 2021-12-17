const {MongoClient} = require('mongodb');

const uri = 'mongodb://localhost:27017/';

const client = new MongoClient(uri);

async function conectar() {
  await client.connect();
  await client.db('tallerMecanica').command({ping: 1});
  console.log('Conectado correctamente');
  return client.db('tallerMecanica');
}

async function desconectar() {
  await client.close();
  console.log('Desconectado');
}

/* async function test() {
  try {
    await conectar();
  } finally {
    await desconectar();
  }
}
test().catch(console.dir); */

module.exports = {conectar, desconectar};

