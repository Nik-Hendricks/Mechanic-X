class ButtonInput extends HTMLElement{
    constructor(props){
        super();
        this.Style({
            width: "calc(100% - 20px)",
            height: "40px",
            display:'block',
            padding: "0px",
            borderBottom: "1px solid #1e272e",
            color: "#0f1417",
            cursor: "pointer",
            margin:'0px',
            userSelect: "none",
            backgroundColor: '#00d8d6',
            borderRadius:'10px',
            border:'none',
            marginBottom:'10px',
            outline:'none',
            fontSize:'15px',
            fontWeight:'bold',
            lineHeight:'40px',
            textAlign:'center',
            marginLeft:'10px',
        })

        this.innerText = props.text || "";

        this.onclick = props.onclick || function(){};



    }
}

window.customElements.define('button-input', ButtonInput);
export default ButtonInput;