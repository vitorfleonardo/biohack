const medicationModel = require('../models/medicationModel');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  getAllMedications: async (req, res) => {
    const meds = await medicationModel.getAll();
    res.status(200).json(meds);
  },

  getMedicationById: async (req, res) => {
    const { id } = req.params;
    const med = await medicationModel.getById(id);
    if (!med) {
      return res.status(404).json({ message: 'Medicamento não encontrado' });
    }
    res.status(200).json(med);
  },

  createMedication: async (req, res) => {
    const { name, description, date, time } = req.body;

    if (!name || !date || !time) {
      return res.status(400).json({
        message: 'Nome, data e horário são obrigatórios',
      });
    }

    const newMed = {
      name,
      description: description || '',
      date,
      time,
    };

    const createdMed = await medicationModel.create(newMed);
    res.status(201).json(createdMed);
  },

  updateMedication: async (req, res) => {
    const { id } = req.params;
    const { name, description, date, time } = req.body;

    const updated = await medicationModel.update(id, {
      name,
      description,
      date,
      time,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Medicamento não encontrado' });
    }

    res.status(200).json(updated);
  },

  deleteMedication: async (req, res) => {
    const { id } = req.params;
    const removed = await medicationModel.remove(id);

    if (!removed) {
      return res.status(404).json({ message: 'Medicamento não encontrado' });
    }

    res.status(204).send();
  },
};
