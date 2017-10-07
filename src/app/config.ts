
function makeAppConfig() {
    const date = new Date();
    const year = date.getFullYear();

    const AppConfig = {
        brand: 'Material',
        user: 'Lisa',
        year,
        layoutBoxed: false,                             // true, false
        navCollapsed: false,                            // true, false
        navBehind: true,                               // true, false
        fixedHeader: true,                              // true, false
        sidebarWidth: 'large',                         // small, middle, large
        theme: 'light',                                 // light, gray, dark
        colorOption: '34',                              // 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
        AutoCloseMobileNav: true,                       // true, false. Automatically close sidenav on route change (Mobile only)
        productLink: 'https://support.lollylaw.com/',

        // 
        firmNameCB: "Magnificent Firm",
        firmLogoCB: "./assets/images/background/client bridge.PNG",
        firmCal: "(111) 222-333 Ext 1212",
        customUrl: 'www.lawfirmname.com',
        googleEmail: 'contact@lawfirm.com',
        address: 'Street Address, City, State, Zip',

    };

    return AppConfig;
}

export const APPCONFIG = makeAppConfig();


