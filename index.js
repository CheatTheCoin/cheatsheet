import express from "express";
import fetch from "node-fetch";

const app = express();

async function fetchYahoo(symbol) {
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`;
  const res = await fetch(url);
  const json = await res.json();
  const q = json.quoteResponse.result[0];
  return {
    price: q.regularMarketPrice,
    change: q.regularMarketChangePercent
  };
}

app.get("/api/oil", async (req, res) => {
  try {
    const data = await fetchYahoo("BZ=F");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch oil data" });
  }
});

app.get("/api/sp500", async (req, res) => {
  try {
    const data = await fetchYahoo("^GSPC");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sp500 data" });
  }
});

app.listen(3000, () => console.log("Server running"));
