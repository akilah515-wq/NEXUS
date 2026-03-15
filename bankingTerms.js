const bankingTerms = {
  "treasury bill": {
    term: "Treasury Bill (T-Bill)",
    definition: "A short-term government security issued by the Bank of Jamaica. You lend money to the government for a fixed period (usually 30, 60, or 90 days) and earn interest. They are considered one of the safest investments available.",
    example: "If you invest J$100,000 in a 90-day treasury bill at 6% annual rate, you earn roughly J$1,500 in interest after 90 days.",
    related: ["fixed deposit", "bond", "BOJ", "interest rate"]
  },
  "fixed deposit": {
    term: "Fixed Deposit",
    definition: "An account where you lock away a sum of money for a set period of time (e.g. 3, 6, or 12 months) in exchange for a guaranteed interest rate. You cannot withdraw early without a penalty.",
    example: "Placing J$50,000 in a 6-month fixed deposit at 5% annual interest earns you J$1,250 at the end of the term.",
    related: ["treasury bill", "savings account", "interest rate", "maturity"]
  },
  "unit trust": {
    term: "Unit Trust",
    definition: "A pooled investment fund where many investors contribute money that is managed collectively by a professional fund manager. Your money is invested across multiple assets, spreading your risk.",
    example: "JMMB's Income and Growth Fund is a unit trust. You can start with as little as J$1,000 and your money is spread across stocks and bonds.",
    related: ["mutual fund", "JSE", "diversification", "fund manager"]
  },
  "JSE": {
    term: "Jamaica Stock Exchange (JSE)",
    definition: "The official stock exchange of Jamaica where publicly listed companies sell shares of ownership to investors. Buying shares means you own a small part of that company and can earn returns through dividends and price growth.",
    example: "Companies like NCB Financial Group, GraceKennedy, and Sagicor are listed on the JSE. You can buy their shares through a licensed broker.",
    related: ["stocks", "shares", "dividends", "broker", "JMMB", "Barita"]
  },
  "TRN": {
    term: "Taxpayer Registration Number (TRN)",
    definition: "A unique 9-digit number issued by Tax Administration Jamaica (TAJ) to every individual and business. It is required to open a bank account, file taxes, and conduct most formal financial transactions in Jamaica.",
    example: "You can get your TRN at any TAJ office island-wide. It is free and usually issued the same day.",
    related: ["bank account", "identity verification", "TAJ"]
  },
  "interest rate": {
    term: "Interest Rate",
    definition: "The percentage of a loan or deposit that is charged or earned over a period of time. For savings and investments, a higher interest rate means more earnings. For loans, a higher rate means more you pay back.",
    example: "If your savings account has a 3% annual interest rate and you have J$100,000, you earn J$3,000 over one year.",
    related: ["APR", "savings", "loan", "fixed deposit", "BOJ"]
  },
  "open banking": {
    term: "Open Banking",
    definition: "A system that allows third-party financial apps to securely access your bank account data (with your permission) through APIs. Jamaica is still developing its open banking framework under the Bank of Jamaica.",
    example: "In countries with open banking, you can connect all your bank accounts to one app and see all your finances in one place.",
    related: ["API", "BOJ", "fintech", "data sharing"]
  },
  "credit score": {
    term: "Credit Score",
    definition: "A numerical rating (typically 300-850) that represents your creditworthiness based on your borrowing and repayment history. In Jamaica, credit data is managed by CRIF NM Credit Bureau.",
    example: "If you consistently repay loans on time, your credit score improves, making it easier to qualify for a mortgage or business loan.",
    related: ["CRIF", "loan", "mortgage", "credit history"]
  },
  "dividend": {
    term: "Dividend",
    definition: "A payment made by a company to its shareholders from its profits. When you own shares in a profitable company, you may receive regular dividend payments as a return on your investment.",
    example: "If GraceKennedy pays a J$1 dividend per share and you own 500 shares, you receive J$500.",
    related: ["shares", "JSE", "investment", "profit"]
  },
  "bond": {
    term: "Bond",
    definition: "A fixed-income investment where you lend money to a government or company for a set period. In return, they pay you regular interest and return your principal at the end of the term.",
    example: "The Jamaican government issues bonds that pay a fixed interest rate. These are considered safer than stocks but typically offer lower returns.",
    related: ["treasury bill", "interest rate", "maturity", "fixed income"]
  },
  "minimum deposit": {
    term: "Minimum Deposit",
    definition: "The smallest amount of money required to open or maintain a bank account. Different account types and banks have different minimums.",
    example: "JN EasyAccount requires only J$500 to open. NCB basic savings requires J$1,000.",
    related: ["savings account", "bank account", "JN Bank", "NCB"]
  },
  "proof of address": {
    term: "Proof of Address",
    definition: "A document that confirms where you currently live. Banks require this to verify your identity and comply with anti-money laundering regulations. Accepted documents are typically utility bills, bank statements, or official letters no older than 3 months.",
    example: "A JPS light bill, NWC water bill, or Flow internet bill in your name counts as proof of address.",
    related: ["KYC", "bank account", "utility bill", "identity verification"]
  },
  "KYC": {
    term: "Know Your Customer (KYC)",
    definition: "The process banks use to verify the identity of their customers to prevent fraud and money laundering. This is why banks ask for ID, TRN, and proof of address when you open an account.",
    example: "When you visit NCB to open an account, the representative who checks your passport and TRN is completing KYC.",
    related: ["TRN", "proof of address", "AML", "identity verification"]
  },
  "JMMB": {
    term: "JMMB Group",
    definition: "Jamaica Money Market Brokers — one of Jamaica's largest investment and financial services companies. They offer investment accounts, unit trusts, stocks, insurance, and banking services. A common first step for Jamaicans entering investing.",
    example: "You can open a JMMB investment account online and start investing in unit trusts with as little as J$1,000.",
    related: ["unit trust", "JSE", "broker", "investment"]
  },
  "Barita": {
    term: "Barita Investments",
    definition: "A licensed securities dealer and investment company in Jamaica. Barita allows clients to invest in stocks, bonds, fixed income products, and unit trusts. Known for their accessible entry points for new investors.",
    example: "Barita's Optimum Capital Fund allows new investors to start with J$5,000.",
    related: ["JSE", "unit trust", "broker", "JMMB"]
  },
  "BOJ": {
    term: "Bank of Jamaica (BOJ)",
    definition: "Jamaica's central bank. The BOJ regulates monetary policy, controls the supply of money, sets benchmark interest rates, and supervises financial institutions in Jamaica. It does not serve the general public directly.",
    example: "When you hear that interest rates have changed in Jamaica, it is the BOJ making that decision.",
    related: ["interest rate", "monetary policy", "financial regulation"]
  },
  "savings account": {
    term: "Savings Account",
    definition: "A basic bank account designed for storing money safely while earning interest. It offers easy access to your funds and is the recommended first account for new bankers.",
    example: "JN EasyAccount and NCB Online savings account are two of the easiest savings accounts to open in Jamaica.",
    related: ["minimum deposit", "interest rate", "current account", "fixed deposit"]
  },
  "current account": {
    term: "Current Account",
    definition: "A bank account designed for frequent transactions such as paying bills, receiving salary, and making purchases. Usually comes with a debit card and cheque book. Typically earns little to no interest.",
    example: "Many Jamaican employees receive their salary into a current account at NCB or Scotiabank.",
    related: ["savings account", "debit card", "direct deposit"]
  },
  "NCB Capital Markets": {
    term: "NCB Capital Markets",
    definition: "The investment arm of National Commercial Bank Jamaica. Offers brokerage services for JSE stocks, unit trusts, treasury bills, and other investment products to NCB customers.",
    example: "If you have an NCB account, you can add NCB Capital Markets access to buy and sell JSE stocks through NCB Online.",
    related: ["NCB", "JSE", "broker", "unit trust", "JMMB"]
  }
};

module.exports = bankingTerms;
