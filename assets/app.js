(function () {
  var scenarios = {
    inquiry: {
      label: '询盘初筛',
      line: '“Hello, please send me the price for one outdoor padel court.”',
      hint: '先确认项目背景，再用专业经验降低客户决策风险，最后提出少量关键问题推进。'
    },
    price: {
      label: '价格异议',
      line: '“Your price is too expensive. Another supplier is much cheaper.”',
      hint: '不要急着降价。先判断客户是在比价、预算不足、测试你，还是已经倾向其他供应商。'
    },
    silent: {
      label: '客户沉默',
      line: '“Thanks, I will check and come back later.”',
      hint: '沉默通常意味着优先级不足、风险未解除或下一步不清晰。跟进要提供新价值，而不是只问 Any update。'
    },
    closing: {
      label: '逼单成交',
      line: '“We like your court, but we need more time to decide.”',
      hint: '逼单不是催促，而是帮助客户明确决策障碍、时间节点和下一步动作。'
    }
  };

  function setActive(buttons, activeButton) {
    buttons.forEach(function (btn) {
      btn.classList.remove('active', 'bg-[var(--accent)]', 'text-white');
      btn.classList.add('bg-white');
    });
    activeButton.classList.add('active', 'bg-[var(--accent)]', 'text-white');
    activeButton.classList.remove('bg-white');
  }

  var phaseButtons = document.querySelectorAll('.phase-btn');
  phaseButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      phaseButtons.forEach(function (item) { item.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelectorAll('.roadmap-pane').forEach(function (pane) {
        pane.classList.toggle('active', pane.id === btn.dataset.phase);
      });
    });
  });

  var filterButtons = document.querySelectorAll('.module-filter');
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (item) { item.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.dataset.filter;
      document.querySelectorAll('.module-card').forEach(function (card) {
        var show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('active', show);
      });
    });
  });

  var scenarioButtons = document.querySelectorAll('.scenario-btn');
  var customerLine = document.getElementById('customer-line');
  var scenarioBadge = document.getElementById('scenario-badge');
  var coachHint = document.getElementById('coach-hint');
  var currentScenario = 'inquiry';

  scenarioButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      currentScenario = btn.dataset.scenario;
      setActive(scenarioButtons, btn);
      customerLine.textContent = scenarios[currentScenario].line;
      scenarioBadge.textContent = scenarios[currentScenario].label;
      coachHint.textContent = scenarios[currentScenario].hint;
    });
  });

  function scoreReply(text) {
    var lower = text.toLowerCase();
    var trustWords = ['project', 'experience', 'case', 'recommend', 'professional', 'help', 'understand', 'share', '建议', '经验', '案例', '项目', '专业'];
    var analysisWords = ['budget', 'decision', 'timeline', 'install', 'location', 'commercial', 'club', 'contractor', '预算', '决策', '时间', '安装', '场地', '俱乐部', '工程'];
    var pushWords = ['next', 'call', 'video', 'confirm', 'send', 'proposal', 'schedule', '下一步', '电话', '视频', '确认', '方案', '安排'];
    function count(words) {
      return words.reduce(function (sum, word) {
        return sum + (lower.indexOf(word.toLowerCase()) >= 0 ? 1 : 0);
      }, 0);
    }
    var lengthBonus = Math.min(20, Math.floor(text.length / 18));
    var trust = Math.min(100, count(trustWords) * 18 + lengthBonus + 18);
    var analysis = Math.min(100, count(analysisWords) * 16 + lengthBonus + 12);
    var push = Math.min(100, count(pushWords) * 18 + lengthBonus + 10);
    return {
      trust: trust,
      analysis: analysis,
      push: push,
      total: Math.round((trust + analysis + push) / 3)
    };
  }

  function setProgress(index, value) {
    var bar = document.querySelectorAll('.progress-bar')[index];
    bar.style.setProperty('--value', value + '%');
  }

  var reviewBtn = document.getElementById('review-btn');
  var replyBox = document.getElementById('reply-box');
  var feedback = document.getElementById('coach-feedback');

  reviewBtn.addEventListener('click', function () {
    var text = replyBox.value.trim();
    if (!text) {
      feedback.innerHTML = '<strong>先写一版回复。</strong><br>训练价值来自真实输出。哪怕写得不完美，也比直接看标准答案更有效。';
      return;
    }
    var result = scoreReply(text);
    document.getElementById('coach-score').textContent = result.total;
    document.getElementById('trust-score').textContent = result.trust + '%';
    document.getElementById('analysis-score').textContent = result.analysis + '%';
    document.getElementById('push-score').textContent = result.push + '%';
    setProgress(0, result.trust);
    setProgress(1, result.analysis);
    setProgress(2, result.push);

    var advice = [];
    if (result.trust < 65) advice.push('开头需要更像顾问：说明你理解客户正在做项目，并用经验或案例降低风险。');
    if (result.analysis < 65) advice.push('报价前需要问更有销售目的的问题：项目用途、决策人、预算、安装、采购时间。');
    if (result.push < 65) advice.push('结尾要给下一步动作：约电话、发方案、确认场地信息或给出报价条件。');
    if (!advice.length) advice.push('整体逻辑不错：你已经开始从“卖产品”转向“诊断客户并推进决策”。下一步可以让问题更少、更精准。');

    feedback.innerHTML = '<strong>点评：</strong><br>' + advice.join('<br>');
  });

  var navLinks = document.querySelectorAll('.nav-link');
  var sections = Array.prototype.map.call(navLinks, function (link) {
    return document.querySelector(link.getAttribute('href'));
  });
  window.addEventListener('scroll', function () {
    var index = sections.findIndex(function (section) {
      if (!section) return false;
      var rect = section.getBoundingClientRect();
      return rect.top <= 120 && rect.bottom >= 120;
    });
    navLinks.forEach(function (link, i) {
      link.classList.toggle('active', i === index);
    });
  });
})();
