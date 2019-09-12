import Vue from 'vue';
import { notificationOption } from './model';

declare module 'vue/types/vue' {
    interface Vue {
        $notify: {
            (): void;
            success(option: notificationOption): void;
            error(option: notificationOption): void;
            warning(option: notificationOption): void;
            info(option: notificationOption): void;
        };
    }
}
