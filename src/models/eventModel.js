const db = require('../config/firebase');
const collection = db.collection('events');

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

  async create(event) {
    const docRef = await collection.add(event);
    const newDoc = await docRef.get();
    return { id: newDoc.id, ...newDoc.data() };
  },

  async update(id, updatedEvent) {
    const docRef = collection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return null;
    await docRef.update(updatedEvent);
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
