class AddVehicleView extends HTMLElement {
    constructor(element) {
        super(element);
        this.container = document.createElement("div");
        this.vehicle_name = new window.TextInput({text:"Vehicle Name"})
        this.vehicle_make = new window.TextInput({text:"Vehicle Make"})
        this.vehicle_model = new window.TextInput({text:"Vehicle Model"})
        this.vehicle_year = new window.TextInput({text:"Vehicle Year"})
        this.vehicle_color = new window.TextInput({text:"Vehicle Color"})

        this.submit = new window.ButtonInput({text: "Submit", onclick: async () => {
            var vehicle_name = this.vehicle_name.value;
            var vehicle_make = this.vehicle_make.value;
            var vehicle_model = this.vehicle_model.value;
            var vehicle_year = this.vehicle_year.value;
            var vehicle_color = this.vehicle_color.value;

            if(vehicle_name == "" || vehicle_make == "" || vehicle_model == "" || vehicle_year == "" || vehicle_color == ""){
                alert("Please fill out all fields");
                return;
            }

            var data = {
                owner: window.utils.get_cookie('user'),
                vehicle_name: vehicle_name,
                vehicle_make: vehicle_make,
                vehicle_model: vehicle_model,
                vehicle_year: vehicle_year,
                vehicle_color: vehicle_color
            }

            console.log(await window.api.add_vehicle(data));
        }});

        this.container.Style({
            width: (window.device_type == "desktop" ? "350px" : window.innerWidth - 40 + "px"),
            display: "block",
            position: "relative",
            zIndex: 1000,
            marginLeft: "10px",
            marginLeft:'50%',
            top:'35%',
            transform:'translate(-50%)',
        })

        this.container.append(this.vehicle_name, this.vehicle_make, this.vehicle_model, this.vehicle_year, this.vehicle_color, this.submit);
        this.append(this.container);
    }

}  

window.customElements.define('add-vehicle-view', AddVehicleView);
export default AddVehicleView;