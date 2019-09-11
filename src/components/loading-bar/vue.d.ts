import Vue from 'vue';
import { LoadingBarOption } from './model';

declare module 'vue/types/vue' {
    interface Vue {
        $loadingBar: {
            (): void;
            config(option: LoadingBarOption): void;
            start(option: LoadingBarOption): void;
            finish(option: LoadingBarOption): void;
            error(option: LoadingBarOption): void;
            update(option: LoadingBarOption): void;
        };
    }
}
