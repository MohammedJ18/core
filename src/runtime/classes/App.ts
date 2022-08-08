import Widget from "./Widget";

export default class App {
    id: number;
    // Component name
    name: string;

    title: string;
    icon: string;
    minimized: boolean; 
    maximized: boolean;
    maximizable: boolean;
    resizeable: boolean;
    running: boolean;
    locked: boolean;
    owned: boolean;
    size: string;
    zIndex: string;

    utility: boolean;

    solid: boolean;

    parentApp: string;

    points: number;

    widgets: Widget[];
    subApps: App[];

    // children: App[];

   
    constructor(args) {
        this.id = args?.id
        this.name = args?.name

        this.title = args?.title
        this.icon = args?.icon
        this.minimized = args.minimized ?? false
        this.maximized = args.maximized ?? false
        this.maximizable = args.maximizable ?? true
        this.resizeable = args.resizeable ?? true
        this.running = args.running ?? false
        this.zIndex = args.zIndex ?? 20
        this.locked = args.locked ?? false
        this.owned = args.owned ?? false

        this.utility = args.utility ?? false

        this.solid = args.solid ?? false

        this.parentApp = args.parentApp ?? ''

        this.size = args.size ?? "w-2xl h-lg"

        this.points = args.points ?? 0

        this.widgets = args.widgets ?? []
        this.subApps = args.subApps ?? []
    }
    
    open(){
        this.running = true
        this.minimized = false
    }
    
    // Actions - Toggles
    toggleRunning(){
        this.running = !this.running
        this.minimized = false
        if (!this.running)
            this.subApps.forEach(app => app.running = false)
    }

    
    
    toggleMinimize() {
        this.minimized = !this.minimized
    }

    
    toggleMaximize() {
        if (this.maximizable)
            this.maximized = !this.maximized
    }


    // Getters
    getWidget(id: number){
        return this.widgets.find(widget => widget.id === id)
    }

    getSubApp(id: number){
        return this.subApps.find(app => app.id === id)
    }

    // Utilities
    isSubAppsRunning(){
        return this.subApps.some(app => app.running)
    }
}