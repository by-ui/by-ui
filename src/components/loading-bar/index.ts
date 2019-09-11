import LoadingBar from './src/loading-bar';
import { LoadingBarOption } from './model';

let loadingBarInstance: any;
let option: LoadingBarOption = new LoadingBarOption();
let timer: any;


function getLoadingBarInstance(option: LoadingBarOption) {
    loadingBarInstance = loadingBarInstance || new LoadingBar(option);
    return loadingBarInstance;
}

function update(options: LoadingBarOption) {
    const instance = getLoadingBarInstance(options);
    instance.update(options);
}

function hide() {
    setTimeout(() => {
        update(new LoadingBarOption(undefined, undefined, 0, undefined, false));
        destroy()
    }, 800)
}

function destroy() {
    const instance = getLoadingBarInstance(new LoadingBarOption())
    clearTimer()
    loadingBarInstance = null
    instance.destroy()
}

function clearTimer() {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
}

export default {
    start() {
        if (timer) return;

        let percent = 0;

        update(option);

        timer = setInterval(() => {

            percent += Math.floor((Math.random() * 3) + 5);

            if (percent > 90) {
                clearTimer()
            }

            update(new LoadingBarOption(undefined, undefined, percent, 'success', true));

        }, 200);

    },

    update(percent: number) {
        clearTimer();
        option.status = 'success';
        option.percent = percent;
        console.log(option);
        update(option);
    },

    finish() {
        clearTimer();
        option.status = 'success';
        option.percent = 100;
        hide()
    },

    error() {
        clearTimer();
        option.status = 'error';
        option.percent = 100;
        option.color = '';
        update(option);
        hide();
    },

    config(options: LoadingBarOption) {
        option = options
    }

}
