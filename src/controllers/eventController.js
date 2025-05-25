const eventModel = require('../models/eventModel');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  getAllEvents: (req, res) => {
    const events = eventModel.getAll();
    res.status(200).json(events);
  },

  getEventById: (req, res) => {
    const { id } = req.params;
    const event = eventModel.getById(id);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json(event);
  },

  createEvent: (req, res) => {
    const {
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      isCompleted,
    } = req.body;

    // Validação simples
    if (!title || !startDate || !endDate || !startTime || !endTime) {
      return res.status(400).json({
        message: 'Título, datas e horários são obrigatórios',
      });
    }

    const newEvent = {
      id: uuidv4(),
      title,
      description: description || '',
      startDate,
      endDate,
      startTime,
      endTime,
      isCompleted: isCompleted || false,
    };

    const createdEvent = eventModel.create(newEvent);
    res.status(201).json(createdEvent);
  },

  updateEvent: (req, res) => {
    const { id } = req.params;
    const {
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      isCompleted,
    } = req.body;

    const updated = eventModel.update(id, {
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      isCompleted,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    res.status(200).json(updated);
  },

  deleteEvent: (req, res) => {
    const { id } = req.params;
    const removed = eventModel.remove(id);

    if (!removed) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    res.status(204).send();
  },
};
