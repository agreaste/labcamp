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
            let focusableElements = dialog?.querySelectorAll(focusableElementsSelector)
            const firstTabStop = focusableElements && focusableElements[0];
            const lastTabStop =  focusableElements && focusableElements[focusableElements.length - 1];
            firstTabStop && (firstTabStop as HTMLElement).focus();
    
            dialog?.addEventListener('keydown', (e) => {
                if(e.keyCode === 9){
                    if(e.shiftKey){
                        if(document.activeElement === firstTabStop){
                            e.preventDefault();
                            lastTabStop && (lastTabStop as HTMLElement).focus();
                        }
                    }else {
                        if(document.activeElement === lastTabStop){
                            e.preventDefault();
                            firstTabStop && (firstTabStop as HTMLElement).focus();
                        }
                    }
                }
                if(e.keyCode === 27){
                    button && button.focus();
                    dialog?.classList.remove('dialog--open');
                }
            });
        });
    }
}