const LOCK_TTL_MS = 60 * 1000;
const NUM_SEATS = 10;

const seats = {};
for (let i = 1; i <= NUM_SEATS; i++) {
  seats[i] = { status: "available", lockTimer: null, owner: null };
}

function lockSeat(seatId, userId) {
  const seat = seats[seatId];
  if (!seat) return { message: "Seat not found" };
  if (seat.status !== "available") return { message: "Seat not available" };

  seat.status = "locked";
  seat.owner = userId;
  seat.lockTimer = setTimeout(() => {
    seat.status = "available";
    seat.owner = null;
  }, LOCK_TTL_MS);

  return { message: `Seat ${seatId} locked for 1 minute.` };
}

function confirmSeat(seatId, userId) {
  const seat = seats[seatId];
  if (!seat) return { message: "Seat not found" };
  if (seat.status !== "locked" || seat.owner !== userId)
    return { message: "Seat not locked by you" };

  clearTimeout(seat.lockTimer);
  seat.status = "booked";
  seat.owner = null;

  return { message: `Seat ${seatId} booked successfully.` };
}

function getSeats() {
  const result = {};
  for (const id in seats) {
    result[id] = { status: seats[id].status };
  }
  return result;
}

module.exports = { lockSeat, confirmSeat, getSeats };
