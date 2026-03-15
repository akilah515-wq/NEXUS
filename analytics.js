const { categorizeBatch } = require("./categorizer");

function aggregateByCategory(transactions) {
  const categorized = categorizeBatch(transactions);
  const totals = {};
  for (const tx of categorized) {
    totals[tx.category] = (totals[tx.category] || 0) + tx.amount;
  }
  return totals;
}

function formatDonutChart(transactions) {
  const totals = aggregateByCategory(transactions);
  const COLORS = {
    Food:          "#F59E0B",
    Transport:     "#3B82F6",
    Utilities:     "#8B5CF6",
    Entertainment: "#EC4899",
    Health:        "#EF4444",
    Banking:       "#6B7280",
    Other:         "#D1D5DB"
  };
  return {
    labels: Object.keys(totals),
    datasets: [{
      data:            Object.values(totals),
      backgroundColor: Object.keys(totals).map(k => COLORS[k] || "#D1D5DB"),
      borderWidth:     2,
      borderColor:     "#1F2937"
    }]
  };
}

function formatBarChart(transactions) {
  const monthly = {};
  for (const tx of transactions) {
    const month = tx.date.substring(0, 7);
    monthly[month] = (monthly[month] || 0) + tx.amount;
  }
  const sorted = Object.keys(monthly).sort();
  return {
    labels: sorted.map(m => {
      const [year, month] = m.split("-");
      return new Date(year, month - 1).toLocaleString("default", {
        month: "short", year: "2-digit"
      });
    }),
    datasets: [{
      label:           "Total Spending (JMD)",
      data:            sorted.map(m => monthly[m]),
      backgroundColor: "#F59E0B",
      borderRadius:    6
    }]
  };
}

function predictNextMonth(transactions) {
  const monthly = {};
  for (const tx of transactions) {
    const month = tx.date.substring(0, 7);
    monthly[month] = (monthly[month] || 0) + tx.amount;
  }
  const values = Object.values(monthly);
  if (values.length === 0) return { prediction: 0, confidence: "low" };

  const window     = values.slice(-3);
  const average    = window.reduce((a, b) => a + b, 0) / window.length;
  const rounded    = Math.round(average);
  const confidence = values.length >= 3 ? "high" : values.length === 2 ? "medium" : "low";

  const categoryTotals = aggregateByCategory(transactions);
  const topCategory    = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  const baselineAvg    = values.reduce((a, b) => a + b, 0) / values.length;
  const overspendRisk  = rounded > baselineAvg * 1.05;

  return {
    predicted_total:    rounded,
    confidence,
    top_category:       topCategory[0],
    top_category_spend: topCategory[1],
    overspend_warning:  overspendRisk,
    overspend_amount:   overspendRisk ? Math.round(rounded - baselineAvg) : 0,
    note: `Based on ${values.length} month(s) of data using 3-month moving average`
  };
}

function calculateHealthScore(transactions) {
  const categoryTotals = aggregateByCategory(transactions);
  const totalSpend     = Object.values(categoryTotals).reduce((a, b) => a + b, 0);
  const savingsAmount  = categoryTotals["Savings"] || 0;
  const savingsRate    = totalSpend > 0 ? savingsAmount / totalSpend : 0;

  let score = 50;
  score += Math.min(savingsRate * 200, 30);
  score += Math.min(Object.keys(categoryTotals).length * 2, 10);

  const entertainmentRate = (categoryTotals["Entertainment"] || 0) / totalSpend;
  if (entertainmentRate > 0.2) score -= 10;

  return {
    score:            Math.min(Math.round(score), 100),
    savings_rate_pct: Math.round(savingsRate * 100),
    label:            score >= 70 ? "Good" : score >= 45 ? "Fair" : "Needs Work"
  };
}

module.exports = {
  aggregateByCategory,
  formatDonutChart,
  formatBarChart,
  predictNextMonth,
  calculateHealthScore
};