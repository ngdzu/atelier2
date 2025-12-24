/**
 * Scripts module - Client-side JavaScript for interactivity
 */
export function getScripts(statsData: any, tasksData: any[]): string {
    return `
// Initialize animations on page load
window.addEventListener('load', function() {
  // Animate progress bars
  document.querySelectorAll('.progress-fill').forEach(function(el) {
    const target = el.dataset.targetWidth;
    if (target) {
      requestAnimationFrame(function() {
        el.style.width = target + '%';
      });
    }
  });

  // Animate stat values
  document.querySelectorAll('.stat-card').forEach(function(card) {
    const valueEl = card.querySelector('.stat-value');
    const targetValue = parseInt(card.dataset.value);
    if (valueEl && !isNaN(targetValue)) {
      let current = 0;
      const increment = Math.ceil(targetValue / 20);
      const interval = setInterval(function() {
        current += increment;
        if (current >= targetValue) {
          current = targetValue;
          clearInterval(interval);
        }
        valueEl.textContent = current + (card.classList.contains('has-progress') ? '%' : '');
      }, 30);
    }
  });
});

// Hover animations for stat cards
document.querySelectorAll('.stat-card').forEach(function(card) {
  let isAnimating = false;

  card.addEventListener('mouseenter', function() {
    if (isAnimating) return;
    isAnimating = true;

    const valueEl = card.querySelector('.stat-value');
    if (valueEl) {
      valueEl.style.animation = 'countUp 0.3s ease-out';
    }

    if (card.classList.contains('has-progress')) {
      const progressFill = card.querySelector('.progress-fill');
      const targetWidth = card.dataset.progress;
      if (progressFill && targetWidth) {
        progressFill.style.transition = 'none';
        progressFill.style.width = '0%';
        
        requestAnimationFrame(function() {
          requestAnimationFrame(function() {
            progressFill.style.transition = 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
            progressFill.style.width = targetWidth + '%';
          });
        });
      }
    }

    setTimeout(function() {
      isAnimating = false;
    }, 1200);
  });

  card.addEventListener('mouseleave', function() {
    const valueEl = card.querySelector('.stat-value');
    if (valueEl) {
      valueEl.style.animation = '';
    }
  });
});

// Filter functionality
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const statusFilter = document.getElementById('statusFilter');
const priorityFilter = document.getElementById('priorityFilter');
const taskRows = document.querySelectorAll('.task-row');

function filterTasks() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedStatus = statusFilter.value;
  const selectedPriority = priorityFilter.value;

  taskRows.forEach(function(row) {
    const title = row.querySelector('.task-title').textContent.toLowerCase();
    const category = row.dataset.category;
    const status = row.dataset.status;
    const priority = row.dataset.priority;

    const matchesSearch = title.includes(searchTerm);
    const matchesCategory = !selectedCategory || category === selectedCategory;
    const matchesStatus = !selectedStatus || status === selectedStatus;
    const matchesPriority = !selectedPriority || priority === selectedPriority;

    if (matchesSearch && matchesCategory && matchesStatus && matchesPriority) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

searchInput.addEventListener('input', filterTasks);
categoryFilter.addEventListener('change', filterTasks);
statusFilter.addEventListener('change', filterTasks);
priorityFilter.addEventListener('change', filterTasks);

// Modal helpers
const tasksData = ${JSON.stringify(tasksData, null, 2)};

function getStatusColorJS(status) {
  const colors = { PENDING: '#3B82F6', IN_PROGRESS: '#F59E0B', BLOCKED: '#EF4444', COMPLETED: '#10B981', CANCELLED: '#6B7280' };
  return colors[status] || '#6B7280';
}

function getPriorityColorJS(priority) {
  const colors = { CRITICAL: '#DC2626', HIGH: '#F59E0B', MEDIUM: '#3B82F6', LOW: '#6B7280' };
  return colors[priority] || '#6B7280';
}

function formatDateJS(dateStr) {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function openTaskModal(taskId) {
  const task = tasksData.find(t => t.id === taskId);
  if (!task) return;

  const modal = document.getElementById('task-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  modalTitle.textContent = task.title;

  let progressHTML = '';
  if (task.progress) {
    const percentage = task.progress.percentage || 0;
    const completed = task.progress.completed || 0;
    const total = task.progress.total || 0;
    const progressColor = percentage === 100 ? '#10B981' : (percentage >= 50 ? '#3B82F6' : '#F59E0B');
    progressHTML = '' +
      '<div class="detail-item">' +
        '<div class="detail-label">Progress</div>' +
        '<div class="progress-info">' +
          '<div class="progress-bar" style="flex: 1; height: 8px;">' +
            '<div class="progress-fill" style="width: ' + percentage + '%; background: ' + progressColor + '"></div>' +
          '</div>' +
          '<span class="progress-percentage">' + percentage + '%</span>' +
        '</div>' +
        '<div class="progress-text">' + completed + ' of ' + total + ' steps completed</div>' +
      '</div>';
  }

  modalBody.innerHTML = '' +
    '<div class="detail-grid">' +
      '<div class="detail-item"><div class="detail-label">Task ID</div><div class="detail-value">' + task.id + '</div></div>' +
      '<div class="detail-item"><div class="detail-label">Status</div><div class="detail-value"><span class="badge" style="background: ' + getStatusColorJS(task.status) + '20; color: ' + getStatusColorJS(task.status) + ';">' + task.status + '</span></div></div>' +
      '<div class="detail-item"><div class="detail-label">Priority</div><div class="detail-value">' + (task.priority ? '<span class="badge" style="background: ' + getPriorityColorJS(task.priority) + '20; color: ' + getPriorityColorJS(task.priority) + ';">' + task.priority + '</span>' : '-') + '</div></div>' +
      '<div class="detail-item"><div class="detail-label">Category</div><div class="detail-value"><span class="badge" style="background: #e5e7eb; color: #374151;">' + task.category + '</span></div></div>' +
      '<div class="detail-item"><div class="detail-label">Assignee</div><div class="detail-value">' + (task.assignee || 'unassigned') + '</div></div>' +
      '<div class="detail-item"><div class="detail-label">Created</div><div class="detail-value">' + formatDateJS(task.created) + '</div></div>' +
      '<div class="detail-item"><div class="detail-label">Updated</div><div class="detail-value">' + formatDateJS(task.updated) + '</div></div>' +
      (task.estimatedTime ? '<div class="detail-item"><div class="detail-label">Estimated Time</div><div class="detail-value">' + task.estimatedTime + '</div></div>' : '') +
      (task.actualTime ? '<div class="detail-item"><div class="detail-label">Actual Time</div><div class="detail-value">' + task.actualTime + '</div></div>' : '') +
      progressHTML +
    '</div>' +
    (task.description ? '<div class="detail-section"><div class="detail-section-title">Description</div><div class="detail-description">' + task.description + '</div></div>' : '') +
    (task.dependencies && task.dependencies.length ? '<div class="detail-section"><div class="detail-section-title">Dependencies</div><div class="detail-value">' + task.dependencies.join(', ') + '</div></div>' : '') +
    (task.relatedTasks && task.relatedTasks.length ? '<div class="detail-section"><div class="detail-section-title">Related Tasks</div><div class="detail-value">' + task.relatedTasks.join(', ') + '</div></div>' : '');

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeTaskModal() {
  const modal = document.getElementById('task-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

const modalEl = document.getElementById('task-modal');
if (modalEl) {
  modalEl.addEventListener('click', function(e) {
    if (e.target.id === 'task-modal') closeTaskModal();
  });
}

const modalClose = document.querySelector('.modal-close');
if (modalClose) {
  modalClose.addEventListener('click', closeTaskModal);
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeTaskModal();
});

document.querySelectorAll('.task-id').forEach(function(el) {
  el.addEventListener('click', function(evt) {
    evt.preventDefault();
    openTaskModal(el.textContent.trim());
  });
  el.style.cursor = 'pointer';
});

// Chart rendering functions
const palette = ['#8B5CF6', '#3B82F6', '#EC4899', '#F59E0B', '#10B981', '#6B7280', '#22C55E'];

function renderAreaChart(elId, points) {
  const el = document.getElementById(elId);
  if (!el) return;
  const width = 400, height = 240, padding = { left: 40, right: 10, top: 30, bottom: 30 };
  const areaW = width - padding.left - padding.right;
  const areaH = height - padding.top - padding.bottom;
  const max = Math.max(1, ...points.map(p => p.count));
  const stepX = areaW / Math.max(1, points.length - 1);
  let svg = '';
  for (let i = 0; i <= 4; i++) {
    const gridY = padding.top + (areaH / 4) * i;
    const val = Math.round(max - (max / 4) * i);
    svg += '<line x1="' + padding.left + '" y1="' + gridY + '" x2="' + (width - padding.right) + '" y2="' + gridY + '" stroke="#e5e7eb" stroke-width="1" opacity="0.5"/>';
    svg += '<text x="' + (padding.left - 8) + '" y="' + (gridY + 3) + '" text-anchor="end" font-size="9" fill="#9ca3af">' + val + '</text>';
  }
  let path = '';
  points.forEach((p, i) => {
    const x = padding.left + i * stepX;
    const y = height - padding.bottom - (p.count / max) * areaH;
    path += (i === 0 ? 'M' : 'L') + x + ' ' + y + ' ';
  });
  const baseline = padding.left + ' ' + (height - padding.bottom) + ' L ' + (padding.left + (points.length - 1) * stepX) + ' ' + (height - padding.bottom);
  svg += '<defs><linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:0.3" /><stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:0.05" /></linearGradient></defs>';
  svg += '<path d="' + path + 'L ' + baseline + ' Z" fill="url(#areaGrad)"></path>';
  svg += '<path d="' + path + '" fill="none" stroke="#8B5CF6" stroke-width="3" stroke-linejoin="round">' +
         '<animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="0.8s" fill="freeze" />' +
         '</path>';
  points.forEach((p, i) => {
    const x = padding.left + i * stepX;
    const y = height - padding.bottom - (p.count / max) * areaH;
    svg += '<circle cx="' + x + '" cy="' + y + '" r="4" fill="#8B5CF6" opacity="0.7" style="cursor:pointer;">' +
           '<title>' + p.week + ': ' + p.count + ' completed</title>' +
           '</circle>';
  });
  const labels = points.map((p, i) => {
    const x = padding.left + i * stepX;
    return '<text x="' + x + '" y="' + (height - 8) + '" text-anchor="middle" font-size="10" fill="#6b7280">' + (p.week.includes('-W') ? p.week.split('-W')[1] : p.week) + '</text>';
  }).join('');
  el.innerHTML = '<svg width="100%" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '" style="max-width:100%;">' + svg + labels + '</svg>';
}

function renderBarChart(elId, series, colorMap) {
  const el = document.getElementById(elId);
  if (!el) return;
  const width = 400, height = 240, padding = { left: 40, right: 10, top: 24, bottom: 30 };
  const barAreaW = width - padding.left - padding.right;
  const barAreaH = height - padding.top - padding.bottom;
  const keys = Object.keys(series);
  const vals = Object.values(series);
  const max = Math.max(1, ...vals);
  const barW = Math.max(10, (barAreaW / keys.length) * 0.6);
  const gap = (barAreaW - barW * keys.length) / Math.max(1, keys.length - 1);
  let x = padding.left;
  let svg = '<svg width="100%" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '" style="max-width:100%;">';
  keys.forEach((k) => {
    const h = (series[k] / max) * barAreaH;
    const y = height - padding.bottom - h;
    const color = (colorMap && colorMap[k]) || '#8B5CF6';
    svg += '<rect x="' + x + '" y="' + y + '" width="' + barW + '" height="' + h + '" rx="6" fill="' + color + '" opacity="0.85">' +
           '<animate attributeName="height" from="0" to="' + h + '" dur="0.7s" fill="freeze" />' +
           '<animate attributeName="y" from="' + (height - padding.bottom) + '" to="' + y + '" dur="0.7s" fill="freeze" />' +
           '</rect>';
    svg += '<text x="' + (x + barW / 2) + '" y="' + (height - 8) + '" text-anchor="middle" font-size="10" fill="#6b7280">' + k + '</text>';
    const valueY = y - 8; // always place label just above the bar top
    svg += '<text x="' + (x + barW / 2) + '" y="' + valueY + '" text-anchor="middle" font-size="12" fill="#374151" font-weight="700">' + series[k] + '</text>';
    x += barW + gap;
  });
  svg += '</svg>';
  el.innerHTML = svg;
}

function renderPieChart(svgId, entries, legendElId) {
  const el = document.getElementById(svgId);
  if (!el) return;

  let tooltip = document.querySelector('.chart-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    document.body.appendChild(tooltip);
  }

  const paths = el.querySelectorAll('path');
  paths.forEach(function(path, idx) {
    const label = path.dataset.label;
    const value = path.dataset.value;
    if (!label) return;
    
    path.style.cursor = 'pointer';
    path.addEventListener('mouseenter', function(evt) {
      tooltip.textContent = label + ' (' + value + ')';
      tooltip.classList.add('visible');
    });
    path.addEventListener('mousemove', function(evt) {
      tooltip.style.left = (evt.clientX + 10) + 'px';
      tooltip.style.top = (evt.clientY - 30) + 'px';
    });
    path.addEventListener('mouseleave', function() {
      tooltip.classList.remove('visible');
    });
  });
}

// Initialize charts
const statsData = ${JSON.stringify(statsData)};
renderBarChart('barChartStatus', statsData.byStatus, { PENDING: '#3B82F6', IN_PROGRESS: '#F59E0B', BLOCKED: '#EF4444', COMPLETED: '#10B981', CANCELLED: '#6B7280' });
renderAreaChart('areaChart', statsData.completionsByWeek);
const allCategories = Object.entries(statsData.byCategory).sort(function(a, b) { return b[1] - a[1]; });
renderPieChart('pieChart', allCategories, 'pieLegend');
`;
}
