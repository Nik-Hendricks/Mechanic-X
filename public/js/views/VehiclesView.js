class VehiclesView extends HTMLElement{
    constructor(){
        super();
        this.items = [
            {text: "Add Vehicle", icon: "add", view: new window.AddVehicleView(), el: null},
        ]

        this.Style({
            width: "100%",
            height: "100%",
            display: "block",
        })

        for(var item in this.items){
            let item_el = new window.ListItem({text: this.items[item].text, icon: this.items[item].icon, text_color: "#0fbcf9"})
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
        window.api.get_vehicles().then((vehicles) => {
            vehicles = vehicles.vehicles;
            vehicles.forEach((v) => {
                let item_el = new window.ListItem({text: v.vehicle_name, icon: `car-${v.vehicle_make.toLowerCase()}`})
                item_el.onclick = (e) => {
                    window.TM.addTab(window.TM.Tab({text: v.vehicle_name, content: new window.VehicleDiagnosticView({vehicle: v})}))
                    window.TM.update();
                }
                this.append(item_el)
            })
        })
    }
}

window.customElements.define('vehicles-view', VehiclesView);
export default VehiclesView;