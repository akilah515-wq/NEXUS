const express          = require("express");
const router           = express.Router();
const mockTransactions = require("../seedTransactions");

const { formatDonutChart,
        formatBarChart,
        predictNextMonth,
        calculateHealthScore } = require("../analytics");

const { getAdvisorResponse } = require("../advisor");

router.get("/spending", (req, res) => {
  try {
    res.json({
      success: true,
      charts: {
        donut: formatDonutChart(mockTransactions),
        bar:   formatBarChart(mockTransactions)
      },
      prediction:        predictNextMonth(mockTransactions),
      health_score:      calculateHealthScore(mockTransactions),
      transaction_count: mockTransactions.length
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/chat", async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message || message.trim().length === 0) {
    return res.status(400).json({ success: false, error: "Message is required" });
  } 
  try {
    const reply = await getAdvisorResponse(message.trim(), history);
    res.status(200).json({ success: true, reply });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).json({
      success: false,
      error:   "Advisor temporarily unavailable. Please try again."
    });
  }
});

module.exports = router;