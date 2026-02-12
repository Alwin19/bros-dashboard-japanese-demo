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

const formatPeriod = (preset: string | undefined, start?: string, end?: string) => {
  const presetMap: Record<string, string> = {
    "bulan-ini": "Bulan Ini",
    "kemarin": "Kemarin",
    "bulan-lalu": "Bulan Lalu",
    "tahun-ini": "Tahun Ini",
    "tahun-lalu": "Tahun Lalu",
    "12-bulan-terakhir": "12 Bulan Terakhir",
    "custom": "" // Custom falls through to date range
  };

  if (preset && presetMap[preset]) {
    return presetMap[preset];
  }

  // Fallback to custom date range for "custom" or unknown presets
  if (!start || !end) return "Bulan Ini";
  const s = new Date(start);
  const e = new Date(end);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  
  const startStr = `${s.getDate()} ${months[s.getMonth()]} ${s.getFullYear()}`;
  const endStr = `${e.getDate()} ${months[e.getMonth()]} ${e.getFullYear()}`;
  
  return `${startStr} - ${endStr}`;
}

export function cleanKPIData(rawData: any, startDate?: string, endDate?: string, preset?: string) {
  const period = formatPeriod(preset, startDate, endDate);
  return [
    {
      title: "Total Pendapatan JKN",
      value: toIDR(rawData.pendapatan.pendapatan),
      change: `${rawData.pendapatan.persentase_perubahan}%`,
      isPositive: rawData.pendapatan.persentase_perubahan >= 0,
      subtitle: period,
    },
    {
      title: "Total Selisih JKN",
      value: toIDR(rawData.selisih.selisih),
      change: `${rawData.selisih.persentase_perubahan}%`,
      isPositive: rawData.selisih.persentase_perubahan >= 0,
      subtitle: period,
    },
    {
      title: "Total Penerimaan JKN",
      value: toIDR(rawData.penerimaan.penerimaan),
      change: `${rawData.penerimaan.persentase_perubahan}%`,
      isPositive: rawData.penerimaan.persentase_perubahan >= 0,
      subtitle: period,
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

export function cleanOperationalData(rawData: any, startDate?: string, endDate?: string, preset?: string) {
  const period = formatPeriod(preset, startDate, endDate);
  const kpi = [
    {
      title: "ALOS (Rata-rata Lama Tinggal)",
      value: `${rawData.alos?.alos || 0} hari`,
      subtitle: period,
      // change field removed as requested
    },
    {
      title: "Pasien Rawat Jalan Hari Ini",
      value: (rawData.outpatient?.count || rawData.outpatient?.total_kunjungan || 0).toString(),
      subtitle: "Hari Ini",
      change: "0%", 
      isPositive: true,
    },
    {
      title: "Pasien Rawat Inap Hari Ini",
      value: (rawData.inpatient?.count || rawData.inpatient?.total_pasien || 0).toString(),
      subtitle: "Hari Ini",
      change: "0%", 
      isPositive: true,
    }
  ];

  // 2. ALOS Trend Chart
  const alosTrend = rawData.alosTrend?.map((item: any) => ({
    period: item.period || item.bulan || "Unknown",
    value: parseFloat(item.value || item.alos || 0),
  })) || [];

  // 3. Visit Trend Chart (7 Days)
  let visitTrend = [];
  
  // Check if data is in the raw format (RegistrationDate, DepartmentID)
  // Check array length first to be safe
  if (rawData.visitTrend && rawData.visitTrend.length > 0 && (rawData.visitTrend[0].RegistrationDate || rawData.visitTrend[0].registrationdate)) {
      const visitMap = new Map<string, { rawatJalan: number; rawatInap: number, date: Date }>();
      
      rawData.visitTrend.forEach((item: any) => {
          const dateStr = item.RegistrationDate || item.registrationdate;
          if (!dateStr) return;

          const d = new Date(dateStr);
          const key = d.toISOString().split('T')[0]; // YYYY-MM-DD
          
          if (!visitMap.has(key)) {
              visitMap.set(key, { rawatJalan: 0, rawatInap: 0, date: d });
          }
          
          const entry = visitMap.get(key)!;
          const count = Number(item.JumlahPasien || item.jumlahpasien || 0);
          const dept = (item.DepartmentID || item.departmentid || "").toUpperCase();
          
          if (dept === 'INPATIENT') {
              entry.rawatInap += count;
          } else {
              // Aggregate EMERGENCY, OUTPATIENT, MEDICAL CHECK UP etc. as Rawat Jalan
              entry.rawatJalan += count;
          }
      });
      
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      
      visitTrend = Array.from(visitMap.values())
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .map(v => ({
            day: days[v.date.getDay()],
            rawatJalan: v.rawatJalan,
            rawatInap: v.rawatInap
        }));
        
  } else {
       // Fallback to previous logic or simple mapping
       visitTrend = rawData.visitTrend?.map((item: any) => ({
        day: item.hari || "Unknown",
        rawatJalan: parseInt(item.rawat_jalan || 0),
        rawatInap: parseInt(item.rawat_inap || 0),
      })) || [];
  }

  // 4. Payer Distribution
  // Handle both casing (Count/Payer vs jumlah_pasien/penanggung_biaya)
  const totalPayer = rawData.topPayer?.reduce((acc: number, curr: any) => acc + parseInt(curr.Count || curr.jumlah_pasien || 0), 0) || 0;
  
  const payerDistribution = rawData.topPayer?.map((item: any, index: number) => {
    const value = parseInt(item.Count || item.jumlah_pasien || 0);
    const percentage = totalPayer > 0 ? parseFloat(((value / totalPayer) * 100).toFixed(1)) : 0;
    const name = item.Payer || item.penanggung_biaya || "Unknown";
    
    return {
      name: name,
      value: percentage, // Recharts Pie uses this to determine slice angle
      rawValue: value,
      formattedValue: value.toString(),
      fill: "var(--primary)"
    };
  }) || [];

  const payerChartConfig = rawData.topPayer?.reduce((acc: any, item: any, index: number) => {
    const name = item.Payer || item.penanggung_biaya || "Unknown";
    // SQL: Use the exact name as key so Shadcn Legend can map it back to the config
    acc[name] = {
      label: name,
      color: "var(--primary)",
    };
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
