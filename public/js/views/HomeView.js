class HomeView extends HTMLElement{
    constructor(){
        super();
        this.items = [
            {text: "Manage Vehicles", icon: "local_shipping", view: new window.VehiclesView(), el:null},
            {text: "Settings", icon: "settings", view: new window.SettingsView(), el:null},
            {text: "Logout", icon: "logout", onclick: () => {window.utils.erase_cookie('user'); window.location.reload()} , el:null},
        ]

        this.Style({
            width: "100%",
            height: "100%",
            display: "block",
        })

        for(var item in this.items){
            let item_el = new window.ListItem({text: this.items[item].text, icon: this.items[item].icon})
            this.items[item].el = item_el;
            item_el.onclick = (e) => {
                var i = this.items.findIndex((el) => { return el.el == (e.target.tagName == "SPAN" ? e.target.parentElement : e.target)})
                if(this.items[i].view != null){
                    window.TM.addTab(window.TM.Tab({text: this.items[i].text, content: this.items[i].view}))
                    window.TM.update();
                }else if(this.items[i].onclick != null){
                    this.items[i].onclick();
                }
            }
            this.append(item_el)
        }
    }
}

window.customElements.define('home-view', HomeView);
export default HomeView;