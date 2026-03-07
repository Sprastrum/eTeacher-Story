export class ScreenManager {

    constructor(appElement) {
        this.app = appElement;
        this.screens = new Map();
        this.currentScreen = null;
        this.history = [];
        this.container = document.querySelector('#app')
    }

    registerScreen(name, screenInstance) {
        this.screens.set(name, screenInstance);
    }

    async goToScreen(screenName, data = {}) {

        console.log(`Navegando a: ${screenName}`)

        if (this.currentScreen) {
            const currentScreenInstance = this.screens.get(this.currentScreen)

            if (currentScreenInstance?.onExit()) {
                await currentScreenInstance.onExit();
            }

            if (currentScreenInstance?.destroy) {
                currentScreenInstance.destroy();
            }

            this.history.push(this.currentScreen);
        }

        this.container.innerHTML = '';

        const screenInstance = this.screens.get(screenName);

        if (!screenInstance) {
            console.error(`Pantalla no encontrada: ${screenName}`);

            return;
        }

        this.container.style.opacity = '0';

        await screenInstance.render(this.container, data);

        if (screenInstance?.onEnter) {
            await screenInstance.onEnter(data);
        }

        setTimeout(() =>{
            this.container.style.opacity = '1';
        }, 50);

        this.currentScreen = screenName;
    }

    getCurrentScreen() {
        return this.currentScreen;
    }
}