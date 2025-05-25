const medicationModel = require('../models/medicationModel');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  getAllMedications: (req, res) => {
    const meds = medicationModel.getAll();
    res.status(200).json(meds);
  },

  getMedicationById: (req, res) => {
    const { id } = req.params;
    const med = medicationModel.getById(id);
    if (!med) {
      return res.status(404).json({ message: 'Medicamento não encontrado' });
    }
    res.status(200).json(med);
  },

  createMedication: (req, res) => {
    const { name, description, date, time } = req.body;

    if (!name || !date || !time) {
      return res.status(400).json({
        message: 'Nome, data e horário são obrigatórios',
      });
    }

    const newMed = {
      id: uuidv4(),
      name,
      description: description || '',
      date,
      time,
    };

    const createdMed = medicationModel.create(newMed);
    res.status(201).json(createdMed);
  },

  updateMedication: (req, res) => {
    const { id } = req.params;
    const { name, description, date, time } = req.body;

    const updated = medicationModel.update(id, {
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

  deleteMedication: (req, res) => {
    const { id } = req.params;
    const removed = medicationModel.remove(id);

    if (!removed) {
      return res.status(404).json({ message: 'Medicamento não encontrado' });
    }

    res.status(204).send();
  },
};
