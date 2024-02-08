

class DialogKo extends HTMLDivElement {
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
        });
    }

    closeModal() {
        this.button.focus();
        this.dialog.classList.remove('dialog--open');
    }

}


export default DialogKo;