

class SettingsView extends HTMLElement{
    constructor(){
        super();
        this.items = [
            {text: "Account", icon: "account_circle", view: new window.SettingsAccountView(), el: null},
            {text: "Appearance", icon: "palette", view: new window.SettingsAccountView(), el: null},
            {text: "Security", icon: "security", view:new window.SettingsAccountView(), el: null},
            {text: "Notifications", icon: "notifications", view: new window.SettingsAccountView(), el: null},
            {text: "Privacy", icon: "privacy_tip", view: new window.SettingsAccountView(), el: null},
            {text: "Help", icon: "help", view: new window.SettingsAccountView(), el: null},
            {text: "About", icon: "info", view: new window.SettingsAccountView(), el: null},
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

customElements.define('settings-view', SettingsView);
export default SettingsView;