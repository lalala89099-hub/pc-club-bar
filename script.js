// Список товаров
const items = [
    { id: 1, name: "Адреналин", qty: 0 },
    { id: 2, name: "Драйв", qty: 0 },
    { id: 3, name: "Эверлес", qty: 0 },
    { id: 4, name: "Липтон 0.5", qty: 0 },
    { id: 5, name: "Сок Любимый", qty: 0 },
    { id: 6, name: "Актив Лимон", qty: 0 },
    { id: 7, name: "Липтон 1 литр", qty: 0 },
    { id: 8, name: "Hell Большой", qty: 0 },
    { id: 9, name: "Hell Маленький", qty: 0 },
    { id: 10, name: "Monster", qty: 0 },
    { id: 11, name: "Баста Энергетик", qty: 0 },
    { id: 12, name: "Кофе", qty: 0 },
    { id: 13, name: "Лаймон Фреш мал.", qty: 0 },
    { id: 14, name: "Лаймон Фреш бол.", qty: 0 },
    { id: 15, name: "Мохито", qty: 0 },
    { id: 16, name: "Вода Бювет", qty: 0 },
    { id: 17, name: "Вода Хрусталь", qty: 0 },
    { id: 18, name: "Милкис", qty: 0 },
    { id: 19, name: "Торнадо 1 литр", qty: 0 },
    { id: 20, name: "Лит Энерджи", qty: 0 },
    { id: 21, name: "Кола", qty: 0 },
    { id: 22, name: "Flash", qty: 0 },
    { id: 23, name: "Burn", qty: 0 },
    { id: 24, name: "Flash 1 литр", qty: 0 },
    { id: 25, name: "Сэндвичи/Панини", qty: 0 },
    { id: 26, name: "Чиаббата/Хот-дог", qty: 0 },
    { id: 27, name: "Чизбургер", qty: 0 }
];

// Отрисовка всех товаров
function renderItems() {
    const grid = document.getElementById('itemsGrid');
    grid.innerHTML = '';
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-name">${item.name}</div>
            <div class="item-controls">
                <button class="btn-minus" onclick="changeQty(${item.id}, -1)">−</button>
                <input type="number" class="qty-input" id="qty-${item.id}" value="${item.qty}" min="0" onchange="updateQty(${item.id}, this.value)">
                <button class="btn-plus" onclick="changeQty(${item.id}, 1)">+</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Изменение количества кнопками
function changeQty(id, delta) {
    const item = items.find(i => i.id === id);
    if (!item) return;
    
    item.qty = Math.max(0, item.qty + delta);
    document.getElementById(`qty-${id}`).value = item.qty;
    
    updateStats();
}

// Обновление количества через ввод
function updateQty(id, value) {
    const item = items.find(i => i.id === id);
    if (!item) return;
    
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 0) {
        item.qty = 0;
    } else {
        item.qty = numValue;
    }
    
    document.getElementById(`qty-${id}`).value = item.qty;
    updateStats();
}

// Обновление статистики
function updateStats() {
    let totalItems = 0;
    
    items.forEach(item => {
        totalItems += item.qty;
    });
    
    document.getElementById('totalItems').textContent = totalItems;
}

// Показать отчет за смену
function showReport() {
    const modal = document.getElementById('reportModal');
    const content = document.getElementById('reportContent');
    
    let reportHTML = '';
    let totalItems = 0;
    
    items.forEach(item => {
        if (item.qty > 0) {
            totalItems += item.qty;
            reportHTML += `
                <div class="report-item">
                    <div>${item.name}</div>
                    <div>${item.qty} шт.</div>
                </div>
            `;
        }
    });
    
    if (reportHTML === '') {
        reportHTML = '<p style="text-align: center; color: #888;">Ничего не продано</p>';
    }
    
    reportHTML += `<div class="report-total">ИТОГО: ${totalItems} шт.</div>`;
    
    content.innerHTML = reportHTML;
    modal.classList.remove('hidden');
}

// Закрыть отчет
function closeReport() {
    document.getElementById('reportModal').classList.add('hidden');
}

// Новая смена
function newShift() {
    if (confirm('Начать новую смену? Все данные будут сброшены.')) {
        items.forEach(item => item.qty = 0);
        renderItems();
        updateStats();
    }
}

// Инициализация
renderItems();
updateStats();