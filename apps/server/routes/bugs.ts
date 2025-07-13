import express from 'express';
import { bugs } from '../data';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(bugs);
});

export default router;