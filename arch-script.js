document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.list1 li');
    const buttons = document.querySelectorAll('.list2 li');
    const searchInput = document.querySelector('#search-line');
    
    const locationFilters = ['Беларусь', 'Украина', 'Россия', 'Прибалтика'];
    const periodFilters = ['1941', '1942', '1943', '1944'];
    
    let activeLocations = [];
    let activePeriods = [];
    
    const getCategory = (text) => {
        if (locationFilters.includes(text)) return 'location';
        if (periodFilters.includes(text)) return 'period';
        return null;
    };
    
    const getItemData = (item) => {
        const p1s = item.querySelectorAll('p1');
        const locations = [];
        const periods = [];
        
        p1s.forEach(p1 => {
            const text = p1.textContent.trim();
            if (locationFilters.includes(text)) locations.push(text);
            if (periodFilters.includes(text)) periods.push(text);
        });
        
        const h1Text = item.querySelector('h1')?.innerText.toLowerCase() || '';
        
        return { locations, periods, h1Text };
    };
    
    const shouldHide = (item, searchValue) => {
        const { locations, periods, h1Text } = getItemData(item);
        
        if (searchValue && !h1Text.includes(searchValue)) return true;
        
        if (activeLocations.length === 0 && activePeriods.length === 0) return false;
        
        const hasLocationMatch = activeLocations.length === 0 || activeLocations.some(loc => locations.includes(loc));
        const hasPeriodMatch = activePeriods.length === 0 || activePeriods.some(period => periods.includes(period));
        
        return !(hasLocationMatch && hasPeriodMatch);
    };
    
    const applyFilters = () => {
        const searchValue = searchInput ? searchInput.value.trim().toLowerCase() : '';
        
        items.forEach(item => {
            if (shouldHide(item, searchValue)) {
                item.classList.add('hide');
            } else {
                item.classList.remove('hide');
            }
        });
    };
    
    const updateButtons = () => {
        buttons.forEach(btn => {
            const text = btn.textContent.trim();
            if (text === 'выбрать все' || text === 'Выбрать все') return;
            
            const isActive = activeLocations.includes(text) || activePeriods.includes(text);
            btn.classList.toggle('active-filter', isActive);
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
        if (text !== 'выбрать все' && text !== 'Выбрать все' && getCategory(text)) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFilter(text);
            });
        }
    });
    
    if (searchInput) {
        searchInput.addEventListener('input', () => applyFilters());
    }
});