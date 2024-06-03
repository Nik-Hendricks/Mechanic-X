class TabViewRouter{
    constructor(){
        this.routes = [];
        this.currentTabView = null;
    }

    addRoute(navLink, tabView){
        this.routes.push({navLink, tabView});
    }

    routeTo(navLink){
        this.currentTabView = this.routes.find(route => route.navLink == navLink).tabView;
        this.currentTabView.render();
    }

    render(){
        return this.currentTabView;
    }


}

export default TabViewRouter;