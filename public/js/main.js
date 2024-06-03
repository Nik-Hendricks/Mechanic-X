import TabManager from './TabManager.js';
import TabViewRouter from './TabViewRouter.js';
import api from './api.js';
import utils from './utils.js';
import ollama from './ollama.js';

import HomeView from './views/HomeView.js';
import SettingsView from './views/SettingsView.js';
import SettingsAccountView from './views/SettingsAccountView.js';
import LoginView from './views/LoginView.js';
import AddVehicleView from './views/AddVehicleView.js';
import VehicleDiagnosticView from './views/VehicleDiagnosticView.js';
import VehiclesView from './views/VehiclesView.js';

import TextInput from './components/TextInput.js';
import ButtonInput from './components/ButtonInput.js';
import ListItem from './components/ListItem.js';

window.utils = utils;
window.ollama = new ollama();

window.device_type = window.innerWidth > 968 ? "desktop" : "mobile";
window.HomeView = HomeView;
window.SettingsView = SettingsView;
window.LoginView = LoginView;
window.SettingsAccountView = SettingsAccountView;
window.AddVehicleView = AddVehicleView;
window.VehicleDiagnosticView = VehicleDiagnosticView;
window.VehiclesView = VehiclesView;

window.TextInput = TextInput;
window.ButtonInput = ButtonInput;
window.ListItem = ListItem;


class app{
    constructor(){
        window.api = api;
        this.setDefaultStyles();
        this.sidebar = this.create_sidebar();
        this.view_container = this.create_view_container();

        document.body.append(this.sidebar, this.view_container);
        window.TM = new TabManager({container: this.view_container, tab_height: "40px"});

        console.log(window.utils.get_cookie("user"))
        if(window.utils.get_cookie("user") == null){
            window.TM.addTab(window.TM.Tab({text: "Login", content: new window.LoginView()}))
        }else{
            window.TM.addTab(window.TM.Tab({text: "Home", content: new window.HomeView()}))
            this.update_sidebar();
        }

    }

    update_sidebar(){
        window.api.get_vehicles().then((vehicles) => {
            this.sidebar.innerHTML = "";
            vehicles = vehicles.vehicles;
            vehicles.forEach((vehicle) => {
                console.log(vehicle)
                let item_item = document.createElement("div");
                let item_icon = document.createElement("span");
                let item_text = document.createElement("span");
                let item_arrow = document.createElement("span");
    
                item_item.Style({
                    width: "100%",
                    height: "50px",
                    display:'block',
                    alignItems: "center",
                    padding: "0px",
                    borderBottom: "1px solid #1e272e",
                    color: "#fff",
                    cursor: "pointer",
                    margin:'0px',
                    userSelect: "none",
                })
    
                item_icon.Style({
                    width: "50px",
                    height: "50px",
                    display: "inline-block",
                    textAlign: "center",
                    lineHeight: "50px",
                    fontSize: "20px",
                    float: "left",
                    color:'#99efef'
                })
    
                item_text.Style({
                    width: "calc(100% - 100px)",
                    height: "50px",
                    display: "inline-block",
                    textAlign: "left",
                    lineHeight: "50px",
                    fontSize: "20px",
                    float: "left",
                    color:'#00d8d6'
                })
    
                item_arrow.Style({
                    width: "50px",
                    height: "50px",
                    display: "inline-block",
                    textAlign: "center",
                    lineHeight: "50px",
                    fontSize: "20px",
                    float: "left",
                })
    
    
                item_icon.Classes([`car-${vehicle.vehicle_make}`])
                item_arrow.Classes(["material-icons"])

                
                item_text.innerHTML = vehicle.vehicle_make + " " + vehicle.vehicle_model;
                item_arrow.innerHTML = "arrow_forward";

                item_item.Append([item_icon, item_text, item_arrow])
                this.sidebar.append(item_item)

                item_item.onclick = () => {
                    window.TM.addTab(window.TM.Tab({text: vehicle.vehicle_make + " " + vehicle.vehicle_model, content: new window.DiagnoseVehicleHomeView(vehicle)}))
                }
            })
        })
    }

    setDefaultStyles(){
        document.body.Style({
            margin: '0px',
            padding: '0px',
            overflow: "none",
            fontFamily: "Arial, sans-serif",
        })
    }

    create_view_container(){
        let container = document.createElement("div");
        container.Style({
            position: "absolute",
            width: (window.device_type == "desktop" ? "calc(100% - 350px)" : "100%"),
            height: "100%",
            backgroundColor: "#1e272e",
            display:'block',
            float:'right',
            right: '0px',
            margin:'0px',
        })        
        return container;
    }

    create_sidebar(){
        let sidebar = document.createElement("div");
        sidebar.Style({
            position: "relative",
            width: (window.device_type == "desktop" ? "350px" :  window.innerWidth + "px"),
            height: "100%",
            backgroundColor: "#1b2329",
            display:'block',
            float: 'left',
            left: (window.device_type == "desktop" ? 0 : "-" + window.innerWidth + "px"),
            zIndex: 1000,
            transition: "left 0.5s"
        })

    
        sidebar.toggle = () => {
            sidebar.Style({
                left: (sidebar.style.left == "0px" ? "-" + window.innerWidth + "px" : 0)
            })
        }

        return sidebar;
    }
}

HTMLElement.prototype.Style = function(styles){
    for(var key in styles){
        this.style[key] = styles[key]
    }
    return this
}

HTMLElement.prototype.Append = function(els){
    for(var el in els){
        this.append(els[el])
    }

    return this
}

HTMLElement.prototype.SetAttributes = function(attrs){
    for(var key in attrs){
        this.setAttribute(key, attrs[key])
    }
    return this
}

HTMLElement.prototype.Classes = function(classes){
    for(var cls in classes){
        this.classList.add(classes[cls])
    }
    return this
}

HTMLElement.prototype.on = function(event, callback){
    this.addEventListener(event, callback)
    return this

}

HTMLElement.prototype.onWindowResize = function(callback){
    window.addEventListener('resize', callback)
    return this
}

HTMLElement.prototype.onViewLoad = function(callback){
    window.addEventListener('load', callback)
    return this
}


window.app = new app();