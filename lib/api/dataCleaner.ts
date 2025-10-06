// Helper: IDR formatter
const toIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);


// Helper: Format date to short format (e.g., "1 Feb")
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const month = months[date.getMonth()];
  return `${day} ${month}`;
};

export function cleanKPIData(rawData: any) {
  return [
    {
      title: "Total Pendapatan JKN",
      value: toIDR(rawData.pendapatan.pendapatan),
      change: `${rawData.pendapatan.persentase_perubahan}%`,
      isPositive: rawData.pendapatan.persentase_perubahan >= 0,
      subtitle: "Bulan Ini",
    },
    {
      title: "Total Selisih JKN",
      value: toIDR(rawData.selisih.selisih),
      change: `${rawData.selisih.persentase_perubahan}%`,
      isPositive: rawData.selisih.persentase_perubahan >= 0,
      subtitle: "Bulan Ini",
    },
    {
      title: "Total Penerimaan JKN",
      value: toIDR(rawData.penerimaan.penerimaan),
      change: `${rawData.penerimaan.persentase_perubahan}%`,
      isPositive: rawData.penerimaan.persentase_perubahan >= 0,
      subtitle: "Bulan Ini",
    },
  ];
}

export function cleanRevenueData(rawData: any) {
  // Transform tertinggi data
  const tertinggi = rawData?.tertinggi
    ?.map((item: any) => {
      const value = parseFloat(item.pendapatan);
      if (isNaN(value) || value <= 0) return null;
      
      return {
        category: item.unit,
        value: value,
        formattedValue: toIDR(value),
      };
    })
    .filter(Boolean) || [];

  // Transform terendah data
  const terendah = rawData?.terendah
    ?.map((item: any) => {
      const value = parseFloat(item.pendapatan);
      if (isNaN(value) || value <= 0) return null;
      
      return {
        category: item.unit,
        value: value,
        formattedValue: toIDR(value),
      };
    })
    .filter(Boolean) || [];

  // Transform trend data
  const trend = rawData?.trend
    ?.map((item: any) => {
      const value = parseFloat(item.pendapatan);
      if (isNaN(value) || value <= 0) return null;
      
      return {
        date: formatDate(item.date),
        fullDate: item.date,
        value: value,
        formattedValue: toIDR(value),
      };
    })
    .filter(Boolean) || [];

  return {
    tertinggi,
    terendah,
    trend,
  };
}

export function cleanDifferenceData(rawData: any) {

  // Transform tertinggi data
  const tertinggi = rawData?.tertinggi
    ?.map((item: any) => {
      const value = parseFloat(item.selisih);
      if (isNaN(value)) return null;
      
      return {
        category: item.unit,
        value: value,
        formattedValue: toIDR(value),
      };
    })
    .filter(Boolean) || [];

  // Transform terendah data
  const terendah = rawData?.terendah
    ?.map((item: any) => {
      const value = parseFloat(item.selisih);
      if (isNaN(value)) return null;
      
      return {
        category: item.unit,
        value: value,
        formattedValue: toIDR(value),
      };
    })
    .filter(Boolean) || [];

  // Transform trend data
  const trend = rawData?.trend
    ?.map((item: any) => {
      const value = parseFloat(item.selisih);
      if (isNaN(value)) return null;
      
      return {
        date: formatDate(item.date),
        fullDate: item.date,
        value: value,
        formattedValue: toIDR(value),
      };
    })
    .filter(Boolean) || [];

  return {
    tertinggi,
    terendah,
    trend,
  };
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
        formattedValue: toIDR(value),
        fill: chartColors[index % chartColors.length],
      };
    })
    .filter(Boolean) || [];

  // Generate chart config dynamically
  const chartConfig = rawData.reduce((config: any, item: any, index: number) => {
    config[item.kategori] = {
      label: item.kategori,
      color: chartColors[index % chartColors.length],
    };
    return config;
  }, {});

  return {
    distribution,
    chartConfig,
  };
}

export function cleanRevenueReceipts(rawData: any) {
  const receipts = rawData
    ?.map((item: any) => {
      const value = parseFloat(item.penerimaan);
      if (isNaN(value) || value <= 0) return null;

      return {
        method: item.jenis,
        amount: value,
        formattedAmount: toIDR(value),
      };
    })
    .filter(Boolean) || [];

  // Sort by amount descending (highest first)
  receipts.sort((a: any, b: any) => b.amount - a.amount);

  return receipts;
}