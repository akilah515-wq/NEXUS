const CATEGORY_KEYWORDS = {
  Food: [
    "hi-lo", "hilo", "megamart", "super plus", "progressive",
    "kfc", "burger king", "island grill", "mothers", "tastee",
    "jerk", "bakery", "restaurant", "cafe", "groceries"
  ],
  Transport: [
    "texaco", "rubis", "total", "shell", "petrol", "esso",
    "gas station", "taxi", "uber", "route taxi", "bus"
  ],
  Utilities: [
    "jps", "jamaica public service", "nwc", "national water",
    "flow", "digicel", "lime", "internet", "cable"
  ],
  Entertainment: [
    "netflix", "spotify", "cinema", "carib 5", "palace amusement",
    "bar", "club", "party", "event", "concert", "supreme ventures"
  ],
  Health: [
    "pharmacy", "lasco", "doctors", "clinic", "hospital",
    "lab", "dental", "medication", "chemist"
  ],
  Banking: [
    "ncb", "jn bank", "scotiabank", "cibc", "victoria mutual",
    "bank fee", "atm", "wire", "transfer"
  ]
};

function categorizeTransaction(merchantName) {
  const lower = merchantName.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(keyword => lower.includes(keyword))) {
      return category;
    }
  }
  return "Other";
}

function categorizeBatch(transactions) {
  return transactions.map(tx => ({
    ...tx,
    category: categorizeTransaction(tx.merchant)
  }));
}

module.exports = { categorizeTransaction, categorizeBatch };