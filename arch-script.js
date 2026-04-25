// Поисковик //
document.querySelector('#search-line').oninput = function(){
    let val = this.value.trim();
    let elasticItems = document.querySelectorAll('.list1 li');
    if (val != '') {
        elasticItems.forEach(function(elem) {
            const h1Element = elem.querySelector('h1');
            if (h1Element && h1Element.innerText.search(val) == -1) {
                elem.classList.add('hide');
            }
            else {
                elem.classList.remove('hide');
            }
        });
    }
    else {
        elasticItems.forEach(function(elem) {
                elem.classList.remove('hide');
        });
    }
}
// Фильтр по элементам списка //
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.list1 li');
    const buttons = document.querySelectorAll('.list2 li');
    
    const locationFilters = ['Беларусь', 'Украина', 'Россия', 'Прибалтика'];
    const periodFilters = ['1941', '1942', '1943', '1944'];
    
    let activeLocations = [];
    let activePeriods = [];
    
    const getCategory = (text) => {
        if (locationFilters.includes(text)) return 'location';
        if (periodFilters.includes(text)) return 'period';
        return null;
    };
    
    const shouldHide = (item) => {
        if (activeLocations.length === 0 && activePeriods.length === 0) return false;
        
        const p1s = item.querySelectorAll('p1');
        if (p1s.length === 0) return true;
        
        const itemLocations = [];
        const itemPeriods = [];
        
        p1s.forEach(p1 => {
            const text = p1.textContent.trim();
            if (getCategory(text) === 'location') itemLocations.push(text);
            if (getCategory(text) === 'period') itemPeriods.push(text);
        });
        
        const hasLocationMatch = activeLocations.length === 0 || activeLocations.some(loc => itemLocations.includes(loc));
        const hasPeriodMatch = activePeriods.length === 0 || activePeriods.some(period => itemPeriods.includes(period));
        
        return !(hasLocationMatch && hasPeriodMatch);
    };
    
    const applyFilters = () => {
        items.forEach(item => {
            if (shouldHide(item)) {
                item.classList.add('hide');
            } else {
                item.classList.remove('hide');
            }
        });
    };
    
    const updateButtons = () => {
        buttons.forEach(btn => {
            const text = btn.textContent.trim();
            const isActive = (activeLocations.includes(text) || activePeriods.includes(text));
            
            if (isActive) {
                btn.classList.add('active-filter');
            } else {
                btn.classList.remove('active-filter');
            }
        });
    };
    
    const toggleFilter = (text) => {
        const category = getCategory(text);
        
        if (category === 'location') {
            const index = activeLocations.indexOf(text);
            index === -1 ? activeLocations.push(text) : activeLocations.splice(index, 1);
        } else if (category === 'period') {
            const index = activePeriods.indexOf(text);
            index === -1 ? activePeriods.push(text) : activePeriods.splice(index, 1);
        }
        
        updateButtons();
        applyFilters();
    };
    
    buttons.forEach(btn => {
        const text = btn.textContent.trim();
        if (text === 'выбрать все' || text === 'Выбрать все') return;
        if (getCategory(text)) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFilter(text);
            });
        }
    });
});