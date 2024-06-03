class TextInput extends HTMLElement{
    constructor(props){
        super();
        props = props || {};
        this.input = document.createElement("input");
        this.input.Style({
            width: "calc(100% - 20px)",
            height: "40px",
            display:'block',
            padding: "0px",
            borderBottom: "1px solid #1e272e",
            color: "#fff",
            cursor: "pointer",
            margin:'0px',
            userSelect: "none",
            backgroundColor: '#060809',
            borderRadius:'10px',
            border:'none',
            marginBottom:'10px',
            outline:'none',
            paddingLeft:'10px',
            marginLeft:'10px',
        })

        this.input.placeholder = props.text || "";
        if(props.type == "password"){
            this.input.type = "password";
        }else{
            this.input.type = "text";
        }

        this.append(this.input);
    }

    focus(){
        this.input.focus();
    }

    reset(){
        this.textContent = "";
    }

    get value(){
        return this.input.value;
    }
}

window.customElements.define('text-input', TextInput);
export default TextInput;