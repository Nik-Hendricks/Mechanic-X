class VehicleDiagnosticView extends HTMLElement{
    constructor(props){
        super();
        var vehicle = props.vehicle
        this.conversation_container = document.createElement("div");
        this.conversation_input_container = document.createElement("div");
        this.conversation_input = new window.TextInput({text: "Type a message..."});
        


        this.conversation_container.Style({
            width: '100%',
            height: "calc(100% - 50px)",
            display:'block',
            float:'right',
            right: '0px',
            margin:'0px',
        })
        
        this.conversation_input_container.Style({
            width: '100%',
            height: "50px",
            display:'block',
            float:'right',
            right: '0px',
            margin:'0px',
        })
        
        this.conversation_input.onkeyup = async (e) => {
            if(e.key == "Enter"){
                window.ollama.add_message(vehicle._id, window.ollama.Message({message: e.target.value, role: "user"}));
                this.update_conversation_container(vehicle);
                e.target.value = "";
                console.log(window.ollama.messages[vehicle._id])
               // let p = window.ollama.messages[vehicle._id].map((m) => { return `${m.role}: ${m.message}` }).join("\n");
                var res = await window.ollama.generate({messages: window.ollama.messages[vehicle._id], context_id: vehicle._id});
       
                window.ollama.add_message(vehicle._id, window.ollama.Message({message: res.response, role: "bot"}));
                this.update_conversation_container(vehicle);
            }
        }

        this.conversation_input_container.append(this.conversation_input);
        this.append(this.conversation_container, this.conversation_input_container);
        setTimeout(() => {
            this.update_conversation_container(vehicle);
        }, 200);
    }

    update_conversation_container(vehicle){
        this.conversation_input.focus();
        this.conversation_container.innerHTML = "";
        var messages = window.ollama.messages[vehicle._id];
        if(messages != null){
            messages.forEach((m) => {
                this.conversation_container.append(this.MessageEl({role: m.role, time: m.time, message: m.message}));
            })
            hljs.highlightAll();
        }
    }

    MessageEl(props){
        let role_el = document.createElement("span");
        let timestamp_el = document.createElement("span");
        let message_el = document.createElement("span");
        let container_el = document.createElement("div");

        role_el.textContent = props.role;
        timestamp_el.textContent = props.time;
        //put a newline in the message at 90 characters

        
        message_el.innerHTML = marked.parse(props.message);

        role_el.Style({
            margin:'0px',
            color: (props.role == "bot" ? "#0fbcf9" : "#fbc531"),
            fontSize: "12px",
            fontWeight: "bold",
            marginRight: "10px",
            float: "left",  
        })

        timestamp_el.Style({
            margin:'0px',
            color: "#fff",
            fontSize: "10px",
            float: "right",
            color:'#00d8d6'
        })

        message_el.Style({
            maxWidth: "calc(100% - 20px)",
            margin:'0px',
            color: "#fff",
            fontSize: "14px",
            wordWrap: "break-word", 
        })

        container_el.Style({
            width: "calc(100% - 20px)",
            height: "auto",
            display: "block",
            margin: "10px",
            marginBottom: "0px",
            float: 'left',
        })

        container_el.append(role_el, timestamp_el, message_el);
        return container_el;
    }
}

window.customElements.define('vehicle-diagnostic-view', VehicleDiagnosticView);
export default VehicleDiagnosticView;