// Helper: JPY formatter
const toJPY = (n: number) =>
  new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(n);


// Helper: Format date to short format (e.g., "1/2")
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

const formatPeriod = (preset: string | undefined, start?: string, end?: string) => {
  const presetMap: Record<string, string> = {
    "bulan-ini": "今月",
    "kemarin": "昨日",
    "bulan-lalu": "先月",
    "tahun-ini": "今年",
    "tahun-lalu": "昨年",
    "12-bulan-terakhir": "過去12ヶ月",
    "custom": "",
  };

  if (preset && presetMap[preset]) {
    return presetMap[preset];
  }

  if (!start || !end) return "今月";
  const s = new Date(start);
  const e = new Date(end);

  const startStr = `${s.getFullYear()}年${s.getMonth() + 1}月${s.getDate()}日`;
  const endStr = `${e.getFullYear()}年${e.getMonth() + 1}月${e.getDate()}日`;

  return `${startStr} - ${endStr}`;
}

export function cleanKPIData(rawData: any, startDate?: string, endDate?: string, preset?: string) {
  const period = formatPeriod(preset, startDate, endDate);
  return [
    {
      title: "健保収益合計",
      value: toJPY(rawData.pendapatan.pendapatan),
      change: `${rawData.pendapatan.persentase_perubahan}%`,
      isPositive: rawData.pendapatan.persentase_perubahan >= 0,
      subtitle: period,
    },
    {
      title: "健保差額合計",
      value: toJPY(rawData.selisih.selisih),
      change: `${rawData.selisih.persentase_perubahan}%`,
      isPositive: rawData.selisih.persentase_perubahan >= 0,
      subtitle: period,
    },
    {
      title: "健保受取合計",
      value: toJPY(rawData.penerimaan.penerimaan),
      change: `${rawData.penerimaan.persentase_perubahan}%`,
      isPositive: rawData.penerimaan.persentase_perubahan >= 0,
      subtitle: period,
    },
  ];
}

export function cleanRevenueData(rawData: any) {
  const tertinggi = rawData?.tertinggi
    ?.map((item: any) => {
      const value = parseFloat(item.pendapatan);
      if (isNaN(value) || value <= 0) return null;
      return {
        category: item.unit,
        value: value,
        formattedValue: toJPY(value),
      };
    })
    .filter(Boolean) || [];

  const terendah = rawData?.terendah
    ?.map((item: any) => {
      const value = parseFloat(item.pendapatan);
      if (isNaN(value) || value <= 0) return null;
      return {
        category: item.unit,
        value: value,
        formattedValue: toJPY(value),
      };
    })
    .filter(Boolean) || [];

  const trend = rawData?.trend
    ?.map((item: any) => {
      const value = parseFloat(item.pendapatan);
      if (isNaN(value) || value <= 0) return null;
      return {
        date: formatDate(item.date),
        fullDate: item.date,
        value: value,
        formattedValue: toJPY(value),
      };
    })
    .filter(Boolean) || [];

  return { tertinggi, terendah, trend };
}

export function cleanDifferenceData(rawData: any) {
  const tertinggi = rawData?.tertinggi
    ?.map((item: any) => {
      const value = parseFloat(item.selisih);
      if (isNaN(value)) return null;
      return {
        category: item.unit,
        value: value,
        formattedValue: toJPY(value),
      };
    })
    .filter(Boolean) || [];

  const terendah = rawData?.terendah
    ?.map((item: any) => {
      const value = parseFloat(item.selisih);
      if (isNaN(value)) return null;
      return {
        category: item.unit,
        value: value,
        formattedValue: toJPY(value),
      };
    })
    .filter(Boolean) || [];

  const trend = rawData?.trend
    ?.map((item: any) => {
      const value = parseFloat(item.selisih);
      if (isNaN(value)) return null;
      return {
        date: formatDate(item.date),
        fullDate: item.date,
        value: value,
        formattedValue: toJPY(value),
      };
    })
    .filter(Boolean) || [];

  return { tertinggi, terendah, trend };
}

export function cleanRevenueDistribution(rawData: any) {
  const chartColors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  const total = rawData.reduce((sum: number, item: any) => {
    return sum + parseFloat(item.pendapatan || 0);
  }, 0);

  const distribution = rawData
    ?.map((item: any, index: number) => {
      const value = parseFloat(item.pendapatan);
      if (isNaN(value) || value <= 0) return null;

      const percentage = total > 0 ? Math.round((value / total) * 1000) / 10 : 0;

      return {
        name: item.kategori,
        value: percentage,
        rawValue: value,
        formattedValue: toJPY(value),
        fill: chartColors[index % chartColors.length],
      };
    })
    .filter(Boolean) || [];

  const chartConfig = rawData.reduce((config: any, item: any, index: number) => {
    config[item.kategori] = {
      label: item.kategori,
      color: chartColors[index % chartColors.length],
    };
    return config;
  }, {});

  return { distribution, chartConfig };
}

export function cleanRevenueReceipts(rawData: any) {
  const receipts = rawData
    ?.map((item: any) => {
      const value = parseFloat(item.penerimaan);
      if (isNaN(value) || value <= 0) return null;

      return {
        method: item.jenis,
        amount: value,
        formattedAmount: toJPY(value),
      };
    })
    .filter(Boolean) || [];

  receipts.sort((a: any, b: any) => b.amount - a.amount);

  return receipts;
}

export function cleanOperationalData(rawData: any, startDate?: string, endDate?: string, preset?: string) {
  const period = formatPeriod(preset, startDate, endDate);
  const kpi = [
    {
      title: "ALOS（平均在院日数）",
      value: `${rawData.alos?.alos || 0}日`,
      subtitle: period,
    },
    {
      title: "本日の外来患者数",
      value: (rawData.outpatient?.count || rawData.outpatient?.total_kunjungan || 0).toString(),
      subtitle: "本日",
      change: "0%",
      isPositive: true,
    },
    {
      title: "本日の入院患者数",
      value: (rawData.inpatient?.count || rawData.inpatient?.total_pasien || 0).toString(),
      subtitle: "本日",
      change: "0%",
      isPositive: true,
    }
  ];

  const alosTrend = rawData.alosTrend?.map((item: any) => ({
    period: item.period || item.bulan || "Unknown",
    value: parseFloat(item.value || item.alos || 0),
  })) || [];

  let visitTrend = [];

  if (rawData.visitTrend && rawData.visitTrend.length > 0 && (rawData.visitTrend[0].RegistrationDate || rawData.visitTrend[0].registrationdate)) {
    const visitMap = new Map<string, { rawatJalan: number; rawatInap: number, date: Date }>();

    rawData.visitTrend.forEach((item: any) => {
      const dateStr = item.RegistrationDate || item.registrationdate;
      if (!dateStr) return;

      const d = new Date(dateStr);
      const key = d.toISOString().split('T')[0];

      if (!visitMap.has(key)) {
        visitMap.set(key, { rawatJalan: 0, rawatInap: 0, date: d });
      }

      const entry = visitMap.get(key)!;
      const count = Number(item.JumlahPasien || item.jumlahpasien || 0);
      const dept = (item.DepartmentID || item.departmentid || "").toUpperCase();

      if (dept === 'INPATIENT') {
        entry.rawatInap += count;
      } else {
        entry.rawatJalan += count;
      }
    });

    const days = ['日', '月', '火', '水', '木', '金', '土'];

    visitTrend = Array.from(visitMap.values())
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map(v => ({
        day: days[v.date.getDay()],
        rawatJalan: v.rawatJalan,
        rawatInap: v.rawatInap
      }));

  } else {
    visitTrend = rawData.visitTrend?.map((item: any) => ({
      day: item.hari || "Unknown",
      rawatJalan: parseInt(item.rawat_jalan || 0),
      rawatInap: parseInt(item.rawat_inap || 0),
    })) || [];
  }

  const totalPayer = rawData.topPayer?.reduce((acc: number, curr: any) => acc + parseInt(curr.Count || curr.jumlah_pasien || 0), 0) || 0;

  const payerDistribution = rawData.topPayer?.map((item: any, index: number) => {
    const value = parseInt(item.Count || item.jumlah_pasien || 0);
    const percentage = totalPayer > 0 ? parseFloat(((value / totalPayer) * 100).toFixed(1)) : 0;
    const name = item.Payer || item.penanggung_biaya || "Unknown";

    return {
      name: name,
      value: percentage,
      rawValue: value,
      formattedValue: value.toString(),
      fill: "var(--primary)"
    };
  }) || [];

  const payerChartConfig = rawData.topPayer?.reduce((acc: any, item: any, index: number) => {
    const name = item.Payer || item.penanggung_biaya || "Unknown";
    acc[name] = { label: name, color: "var(--primary)" };
    return acc;
  }, {}) || {};

  return {
    kpi,
    alosTrend,
    visitTrend,
    payerDistribution: {
      distribution: payerDistribution,
      chartConfig: payerChartConfig,
    }
  };
}
