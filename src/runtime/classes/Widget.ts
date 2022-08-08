export default class Widget {
    id: number;
    // Component name
    name: string;

    title: string;
    state: boolean;

    constructor(args) {
        this.id = args?.id;
        this.name = args?.name;

        this.title = args?.title
        this.state = args?.state ?? false
    }

    toggleState() {
        this.state = !this.state
    }
}