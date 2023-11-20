const today = new Date();
const maxDeadline = today.setDate(today.getDate() + 30);

module.exports = maxDeadline;
