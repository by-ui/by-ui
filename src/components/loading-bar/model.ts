export class LoadingBarOption {

    width: number | string;
    color: string;
    percent: number;
    status: string;
    show: boolean;

    constructor(width: number | string = '', color: string = '', percent: number = 100, status: string = '', show: boolean = true) {
        this.width = width;
        this.color = color;
        this.percent = percent;
        this.status = status;
        this.show = show;
    }
}
