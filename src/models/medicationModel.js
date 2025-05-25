const db = require('../config/firebase');
const collection = db.collection('medications');

module.exports = {
  async getAll() {
    const snapshot = await collection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async getById(id) {
    const doc = await collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  },

  async create(medication) {
    const docRef = await collection.add(medication);
    const newDoc = await docRef.get();
    return { id: newDoc.id, ...newDoc.data() };
  },

  async update(id, updatedMed) {
    const docRef = collection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return null;
    await docRef.update(updatedMed);
    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
  },

  async remove(id) {
    const docRef = collection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return null;
    await docRef.delete();
    return true;
  },
};
