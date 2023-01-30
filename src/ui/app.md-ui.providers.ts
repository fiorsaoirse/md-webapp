import { Provider } from '@angular/core';
import { MD_ARROW_ICON_URL, MD_CLOSE_ICON_URL } from 'md-ui-kit/common';

export const MD_UI_PROVIDERS: Provider[] = [
    {
        provide: MD_CLOSE_ICON_URL,
        useValue: '/assets/icons/close.svg',
    },
    {
        provide: MD_ARROW_ICON_URL,
        useValue: '/assets/icons/chevron.svg',
    },
];
