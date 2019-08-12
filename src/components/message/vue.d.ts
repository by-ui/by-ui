import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $Message: {
            (option: any): void;
            info(option: any): void;
            success(option: any): void;
            warning(option: any): void;
            error(option: any): void;
            loading(option: any): void;
        };
    }
}
