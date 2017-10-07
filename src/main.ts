import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
    enableProdMode();
}

export function main() {
    return platformBrowserDynamic().bootstrapModule(AppModule).
    then(success => console.log("BootStrap Success"))
    .catch(err => console.error(err));
}

if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}
