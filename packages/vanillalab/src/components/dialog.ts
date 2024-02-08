

class Dialog extends HTMLDivElement {
    button: HTMLButtonElement;
    dialog: HTMLDivElement;
    closeButton: HTMLDivElement;

    constructor() {
        super();
        this.button = <HTMLButtonElement> this.querySelector('#openButton');
        this.dialog = <HTMLDivElement> this.querySelector('#dialog');
        this.closeButton = <HTMLDivElement> this.querySelector('#closeButton');
        this.closeButton.addEventListener('click', () => {
            this.closeModal();
        });
        this.openModal();
    }

    openModal(){
        this.button.addEventListener('click', () => {
            this.dialog.classList.add('dialog--open');
            this.setTabTrap();
        });
    }

    closeModal() {
        this.button.focus();
        this.dialog.classList.remove('dialog--open');
    }

    setTabTrap(){
        const focusableElementsSelector = 'a[href], input:not([disabled]), button, [tabindex="0"]';
            let focusableElements = this.dialog.querySelectorAll<HTMLElement>(focusableElementsSelector)
            const firstTabStop = focusableElements && focusableElements[0];
            const lastTabStop =  focusableElements && focusableElements[focusableElements.length - 1];
            firstTabStop?.focus();
    
            this.dialog.addEventListener('keydown', (e) => {
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
                    this.closeModal();
                }
            });
    }

}


export default Dialog;