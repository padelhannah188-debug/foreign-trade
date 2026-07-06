(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var bg = style.getPropertyValue('--bg').trim();

  function makeRadar() {
    var el = document.getElementById('chart-radar');
    if (!el || !window.echarts) return;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    chart.setOption({
      animation: false,
      color: [accent2, accent],
      tooltip: { appendToBody: true },
      legend: {
        bottom: 0,
        textStyle: { color: muted },
        data: ['当前', '目标']
      },
      radar: {
        radius: '62%',
        center: ['50%', '46%'],
        splitNumber: 5,
        axisName: { color: ink, fontSize: 12 },
        axisLine: { lineStyle: { color: rule } },
        splitLine: { lineStyle: { color: rule } },
        splitArea: {
          areaStyle: { color: [bg2, bg] }
        },
        indicator: [
          { name: '产品知识', max: 100 },
          { name: '英语表达', max: 100 },
          { name: '外贸知识', max: 100 },
          { name: '销售思维', max: 100 },
          { name: '客户分析', max: 100 },
          { name: '谈判能力', max: 100 },
          { name: '成交能力', max: 100 },
          { name: '信任建立', max: 100 }
        ]
      },
      series: [{
        type: 'radar',
        data: [
          {
            name: '当前',
            value: [80, 60, 60, 40, 20, 20, 20, 20],
            areaStyle: { color: accent2 + '33' },
            lineStyle: { width: 2 }
          },
          {
            name: '目标',
            value: [95, 85, 85, 90, 95, 85, 85, 95],
            areaStyle: { color: accent + '22' },
            lineStyle: { width: 3 }
          }
        ]
      }]
    });
    window.addEventListener('resize', function () { chart.resize(); });
  }

  function makeChannelPie() {
    var el = document.getElementById('chart-channel');
    if (!el || !window.echarts) return;
    var chart = echarts.init(el, null, { renderer: 'svg' });
    chart.setOption({
      animation: false,
      color: [accent, accent2, accent3],
      tooltip: {
        appendToBody: true,
        trigger: 'item',
        formatter: '{b}<br>{c}%'
      },
      legend: {
        bottom: 0,
        textStyle: { color: muted }
      },
      series: [{
        name: '获客渠道',
        type: 'pie',
        radius: ['45%', '68%'],
        center: ['50%', '43%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: bg2,
          borderWidth: 4
        },
        label: {
          color: ink,
          formatter: '{b}\n{d}%'
        },
        data: [
          { value: 60, name: 'Facebook' },
          { value: 30, name: '自主开发' },
          { value: 10, name: '阿里国际站' }
        ]
      }]
    });
    window.addEventListener('resize', function () { chart.resize(); });
  }

  makeRadar();
  makeChannelPie();
})();
