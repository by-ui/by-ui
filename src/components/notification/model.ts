export class notificationOption {

    title: string;
    content: string;
    duration: number;
    type: string;
    show: boolean;

    constructor(title: string, content: string, duration: number = 4000, type: string = '', show: boolean = true) {
        this.title = title;
        this.content = content;
        this.duration = duration;
        this.type = type;
        this.show = show;
    }
}
