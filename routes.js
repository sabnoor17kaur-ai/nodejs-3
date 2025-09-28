const express = require("express");
const { getSeats, lockSeat, confirmSeat } = require("./seats");

const router = express.Router();

router.get("/seats", (req, res) => {
  res.json(getSeats());
});

router.post("/lock/:id", (req, res) => {
  const userId = req.body.userId;
  res.status(200).json(lockSeat(req.params.id, userId));
});

router.post("/confirm/:id", (req, res) => {
  const userId = req.body.userId;
  res.status(200).json(confirmSeat(req.params.id, userId));
});

module.exports = router;
