const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');

/**
 * @swagger
 * tags:
 *   name: Medications
 *   description: Gerenciamento de medicamentos na agenda
 */

/**
 * @swagger
 * /api/medications:
 *   get:
 *     summary: Listar todos os medicamentos
 *     tags: [Medications]
 *     responses:
 *       200:
 *         description: Lista de medicamentos retornada com sucesso
 */
router.get('/', medicationController.getAllMedications);

/**
 * @swagger
 * /api/medications/{id}:
 *   get:
 *     summary: Buscar medicamento por ID
 *     tags: [Medications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do medicamento
 *     responses:
 *       200:
 *         description: Medicamento encontrado
 *       404:
 *         description: Medicamento não encontrado
 */
router.get('/:id', medicationController.getMedicationById);

/**
 * @swagger
 * /api/medications:
 *   post:
 *     summary: Cadastrar um novo medicamento na agenda
 *     tags: [Medications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *               - time
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do medicamento
 *                 example: Paracetamol
 *               description:
 *                 type: string
 *                 description: Descrição ou observação do medicamento
 *                 example: Tomar após o almoço
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Data para tomar o medicamento
 *                 example: 2025-06-01
 *               time:
 *                 type: string
 *                 description: Horário para tomar o medicamento
 *                 example: 13:00
 *     responses:
 *       201:
 *         description: Medicamento criado com sucesso
 */
router.post('/', medicationController.createMedication);

/**
 * @swagger
 * /api/medications/{id}:
 *   put:
 *     summary: Atualizar um medicamento
 *     tags: [Medications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do medicamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do medicamento
 *               description:
 *                 type: string
 *                 description: Descrição ou observação do medicamento
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Data para tomar o medicamento
 *               time:
 *                 type: string
 *                 description: Horário para tomar o medicamento
 *     responses:
 *       200:
 *         description: Medicamento atualizado com sucesso
 *       404:
 *         description: Medicamento não encontrado
 */
router.put('/:id', medicationController.updateMedication);

/**
 * @swagger
 * /api/medications/{id}:
 *   delete:
 *     summary: Remover um medicamento da agenda
 *     tags: [Medications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do medicamento
 *     responses:
 *       204:
 *         description: Medicamento removido com sucesso
 *       404:
 *         description: Medicamento não encontrado
 */
router.delete('/:id', medicationController.deleteMedication);

module.exports = router;
