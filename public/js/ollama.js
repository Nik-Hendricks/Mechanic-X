class ollama{
    constructor(){
        this.url = 'http://localhost:8080';
        this.messages = [];
    }

    Message(props){
        var role = props.role || "bot";
        var message = props.message;
        var time = props.time || new Date().toLocaleTimeString();
        var id = props.id || this.messages.length * Math.random();
        return {
            id: id,
            role: role,
            message: message,
            time: time,
            message_el: null,
        }
    }

    add_message(context_id, message){
        if(this.messages[context_id] == undefined){
            this.messages[context_id] = [];
        }
        this.messages[context_id].push(message);
        console.log(this.messages)
    }

    async generate(props){
        console.log(props)
        return await window.api.generate(props);
    }
}

export default ollama;