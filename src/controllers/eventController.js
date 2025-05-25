const eventModel = require('../models/eventModel');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  getAllEvents: async (req, res) => {
    const events = await eventModel.getAll();
    res.status(200).json(events);
  },

  getEventById: async (req, res) => {
    const { id } = req.params;
    const event = await eventModel.getById(id);
    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json(event);
  },

  createEvent: async (req, res) => {
    const {
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      isCompleted,
    } = req.body;

    if (!title || !startDate || !endDate || !startTime || !endTime) {
      return res.status(400).json({
        message: 'Título, datas e horários são obrigatórios',
      });
    }

    const newEvent = {
      title,
      description: description || '',
      startDate,
      endDate,
      startTime,
      endTime,
      isCompleted: isCompleted || false,
    };

    const createdEvent = await eventModel.create(newEvent);
    res.status(201).json(createdEvent);
  },

  updateEvent: async (req, res) => {
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

    const updated = await eventModel.update(id, {
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

  deleteEvent: async (req, res) => {
    const { id } = req.params;
    const removed = await eventModel.remove(id);

    if (!removed) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    res.status(204).send();
  },
};
