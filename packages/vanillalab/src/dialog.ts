export default class Dialog {
    constructor() {
        const button = document.getElementById('openButton');
        const dialog = document.getElementById('dialog');
        const closeButton = document.getElementById('closeButton');
        closeButton?.addEventListener('click', () => {
            button && button.focus();
            dialog?.classList.remove('dialog--open');
        });
        button?.addEventListener('click', () => {
            dialog?.classList.add('dialog--open');
            const focusableElementsSelector = 'a[href], input:not([disabled]), button, [tabindex="0"], [tabindex="1"]';
            let focusableElements = dialog?.querySelectorAll<HTMLElement>(focusableElementsSelector)
            const firstTabStop = focusableElements && focusableElements[0];
            const lastTabStop =  focusableElements && focusableElements[focusableElements.length - 1];
            firstTabStop?.focus();
    
            dialog?.addEventListener('keydown', (e) => {
                if(e.key === 'Tab'){
                    if(e.shiftKey){
                        if(document.activeElement === firstTabStop){
                            e.preventDefault();
                            lastTabStop?.focus();
                        }
                    }else {
                        if(document.activeElement === lastTabStop){
                            e.preventDefault();
                            firstTabStop?.focus();
                        }
                    }
                }
                if(e.key === 'Escape'){
                    button && button.focus();
                    dialog?.classList.remove('dialog--open');
                }
            });
        });
    }
}