const toJPY = (n: number) =>
  new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(n);

function getPresetLabel(preset?: string): string {
  const map: Record<string, string> = {
    "bulan-ini": "今月",
    "kemarin": "昨日",
    "bulan-lalu": "先月",
    "tahun-ini": "今年",
    "tahun-lalu": "昨年",
    "12-bulan-terakhir": "過去12ヶ月",
    "custom": "",
  };
  return preset ? (map[preset] || "") : "今月";
}

// ── Financial KPI ────────────────────────────────────────────────────────────
export function getDummyKPIData(preset?: string) {
  const subtitle = getPresetLabel(preset);
  return [
    {
      title: "請求額",
      value: toJPY(285400000),
      change: "3.2%",
      isPositive: true,
      subtitle,
    },
    {
      title: "査定減額",
      value: toJPY(42800000),
      change: "-1.8%",
      isPositive: false,
      subtitle,
    },
    {
      title: "収益額",
      value: toJPY(238600000),
      change: "2.1%",
      isPositive: true,
      subtitle,
    },
  ];
}

// ── Revenue Breakdown ────────────────────────────────────────────────────────
export function getDummyRevenueData() {
  const tertinggi = [
    { category: "内科", value: 68200000, formattedValue: toJPY(68200000) },
    { category: "外科", value: 54800000, formattedValue: toJPY(54800000) },
    { category: "整形外科", value: 48300000, formattedValue: toJPY(48300000) },
    { category: "循環器内科", value: 41600000, formattedValue: toJPY(41600000) },
    { category: "産婦人科", value: 35200000, formattedValue: toJPY(35200000) },
  ];

  const terendah = [
    { category: "皮膚科", value: 8400000, formattedValue: toJPY(8400000) },
    { category: "眼科", value: 9100000, formattedValue: toJPY(9100000) },
    { category: "耳鼻咽喉科", value: 11200000, formattedValue: toJPY(11200000) },
    { category: "泌尿器科", value: 13800000, formattedValue: toJPY(13800000) },
    { category: "精神科", value: 15600000, formattedValue: toJPY(15600000) },
  ];

  const dailyValues = [
    9200000, 8900000, 7800000, 6200000, 4800000,
    10100000, 10800000, 11200000, 10600000, 10400000, 8100000, 5200000,
    10700000, 11400000, 10900000, 11100000, 10300000, 8300000, 5600000,
    10800000, 11600000, 10400000, 11200000, 10600000, 8700000, 5900000,
    11000000, 11800000, 10700000, 10900000, 10200000,
  ];

  const trend = dailyValues.map((value, i) => {
    const d = new Date(2025, 0, i + 1);
    return {
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      fullDate: d.toISOString().split("T")[0],
      value,
      formattedValue: toJPY(value),
    };
  });

  return { tertinggi, terendah, trend };
}

// ── Revenue Distribution ─────────────────────────────────────────────────────
export function getDummyRevenueDistribution() {
  const chartColors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  const items = [
    { name: "健保組合", value: 42, rawValue: 119868000 },
    { name: "後期高齢者医療", value: 28, rawValue: 79912000 },
    { name: "国民健康保険", value: 18, rawValue: 51372000 },
    { name: "自費", value: 8, rawValue: 22832000 },
    { name: "その他", value: 4, rawValue: 11416000 },
  ];

  const distribution = items.map((item, i) => ({
    ...item,
    formattedValue: toJPY(item.rawValue),
    fill: chartColors[i],
  }));

  const chartConfig = items.reduce(
    (acc, item, i) => {
      acc[item.name] = { label: item.name, color: chartColors[i] };
      return acc;
    },
    {} as Record<string, any>
  );

  return { distribution, chartConfig };
}

// ── Difference Breakdown ─────────────────────────────────────────────────────
export function getDummyDifferenceData() {
  const tertinggi = [
    { category: "内科", value: 15200000, formattedValue: toJPY(15200000) },
    { category: "外科", value: 11800000, formattedValue: toJPY(11800000) },
    { category: "整形外科", value: 9600000, formattedValue: toJPY(9600000) },
    { category: "循環器内科", value: 8200000, formattedValue: toJPY(8200000) },
    { category: "産婦人科", value: 6900000, formattedValue: toJPY(6900000) },
  ];

  const terendah = [
    { category: "皮膚科", value: 1200000, formattedValue: toJPY(1200000) },
    { category: "眼科", value: 1600000, formattedValue: toJPY(1600000) },
    { category: "耳鼻咽喉科", value: 2100000, formattedValue: toJPY(2100000) },
    { category: "泌尿器科", value: 2800000, formattedValue: toJPY(2800000) },
    { category: "精神科", value: 3200000, formattedValue: toJPY(3200000) },
  ];

  const diffDailyValues = [
    1380000, 1335000, 1170000, 930000, 720000,
    1515000, 1620000, 1680000, 1590000, 1560000, 1215000, 780000,
    1605000, 1710000, 1635000, 1665000, 1545000, 1245000, 840000,
    1620000, 1740000, 1560000, 1680000, 1590000, 1305000, 885000,
    1650000, 1770000, 1605000, 1635000, 1530000,
  ];

  const trend = diffDailyValues.map((value, i) => {
    const d = new Date(2025, 0, i + 1);
    return {
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      fullDate: d.toISOString().split("T")[0],
      value,
      formattedValue: toJPY(value),
    };
  });

  return { tertinggi, terendah, trend };
}

// ── Revenue Receipts ─────────────────────────────────────────────────────────
export function getDummyRevenueReceipts() {
  const receipts = [
    { method: "振込", amount: 142500000, formattedAmount: toJPY(142500000) },
    { method: "窓口", amount: 58200000, formattedAmount: toJPY(58200000) },
    { method: "口座振替", amount: 28400000, formattedAmount: toJPY(28400000) },
    { method: "オンライン決済", amount: 9500000, formattedAmount: toJPY(9500000) },
  ];
  receipts.sort((a, b) => b.amount - a.amount);
  return receipts;
}

// ── Operational Data ─────────────────────────────────────────────────────────
export function getDummyOperationalData(preset?: string) {
  const subtitle = getPresetLabel(preset);

  const kpi = [
    {
      title: "ALOS（平均在院日数）",
      value: "8.3日",
      subtitle,
    },
    {
      title: "本日の外来患者数",
      value: "342",
      subtitle: "本日",
      change: "+12",
      isPositive: true,
    },
    {
      title: "本日の入院患者数",
      value: "168",
      subtitle: "本日",
      change: "+5",
      isPositive: true,
    },
  ];

  const alosTrend = [
    { period: "1月", value: 8.3 },
    { period: "2月", value: 8.1 },
    { period: "3月", value: 7.9 },
    { period: "4月", value: 8.4 },
    { period: "5月", value: 7.8 },
    { period: "6月", value: 8.0 },
    { period: "7月", value: 8.2 },
    { period: "8月", value: 7.7 },
    { period: "9月", value: 8.1 },
    { period: "10月", value: 7.9 },
    { period: "11月", value: 8.3 },
    { period: "12月", value: 8.6 },
  ];

  const visitTrend = [
    { day: "月", rawatJalan: 312, rawatInap: 142 },
    { day: "火", rawatJalan: 356, rawatInap: 158 },
    { day: "水", rawatJalan: 341, rawatInap: 163 },
    { day: "木", rawatJalan: 328, rawatInap: 147 },
    { day: "金", rawatJalan: 298, rawatInap: 155 },
    { day: "土", rawatJalan: 187, rawatInap: 89 },
    { day: "日", rawatJalan: 143, rawatInap: 76 },
  ];

  const payerItems = [
    { name: "協会けんぽ", rawValue: 1245 },
    { name: "組合健保", rawValue: 876 },
    { name: "後期高齢者医療", rawValue: 654 },
    { name: "国民健康保険", rawValue: 432 },
    { name: "自費", rawValue: 187 },
  ];

  const totalPayers = payerItems.reduce((sum, item) => sum + item.rawValue, 0);
  const chartColors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  const distribution = payerItems.map((item, i) => ({
    name: item.name,
    value: parseFloat(((item.rawValue / totalPayers) * 100).toFixed(1)),
    rawValue: item.rawValue,
    formattedValue: item.rawValue.toLocaleString("ja-JP"),
    fill: chartColors[i % chartColors.length],
  }));

  const chartConfig = payerItems.reduce(
    (acc, item, i) => {
      acc[item.name] = { label: item.name, color: chartColors[i % chartColors.length] };
      return acc;
    },
    {} as Record<string, any>
  );

  return {
    kpi,
    alosTrend,
    visitTrend,
    payerDistribution: { distribution, chartConfig },
  };
}
