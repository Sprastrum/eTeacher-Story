export class BaseScreen {

    constructor(screenManager) {
        this.screenManager = screenManager;
        this.container = null;
    }

    async render(parentElement, data) {
        throw new Error('render() did not implemented');
    }

    destroy() {
        if (this.container) {
            this.container.remove();
            this.container = null;
        }
    }

    transition(targetScreen, data = {}) {
        this.screenManager.goToScreen(targetScreen, data);
    }
}