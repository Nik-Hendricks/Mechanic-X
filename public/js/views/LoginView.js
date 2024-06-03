class LoginView extends HTMLElement{
    constructor(props){
        super();
        props = props || {};
        this.type = props.type || "login";
        this.container = document.createElement("div");
        this.username = new window.TextInput({text: "Username"});
        this.password = new window.TextInput({text: "Password", type: "password"});
        this.submit = new window.ButtonInput({text: (this.type == "login" ? "Login" : "Register"), onclick: async () => {
            let username = this.username.value;
            let password = this.password.value;
            if(this.type == "login"){
                var r = await window.api.login({username, password})
            }else{
                var r = await window.api.register({username, password})
            }

            if(r.success){
                window.utils.set_cookie("user", r.user._id, 1)
                window.TM.addTab(window.TM.Tab({text: "Home", content: new window.HomeView()}))
                window.TM.removeTab(window.TM.tabs[0]);
                window.app.update_sidebar();
            }
        }});
        this.login_or_register = document.createElement("span");
        this.type = props.type || "login"

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

        this.login_or_register.Style({
            display:'block',
            float: "right",
            color: "#006c6b",
            cursor: "pointer",
            marginRight:'20px',
            fontSize:'15px',
        })

        this.login_or_register.innerText = (this.type == "login" ? "Register" : "Login")

        this.login_or_register.onclick = () => {
            this.type = (this.type == "login" ? "register" : "login")
            this.login_or_register.innerText = (this.type == "login" ? "Register" : "Login")
            this.submit.innerText = (this.type == "login" ? "Login" : "Register")
        }

        this.container.append(this.username, this.password, this.submit, this.login_or_register)
        this.append(this.container)
    }
}

window.customElements.define('login-view', LoginView);
export default LoginView;