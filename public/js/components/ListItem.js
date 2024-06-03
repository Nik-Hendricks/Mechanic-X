class ListItem extends HTMLElement{
    constructor(props){
        super()
        props = props || {};
        let icon = document.createElement("span");
        let text = document.createElement("span");
        let arrow = document.createElement("span");

        this.Style({
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

        icon.Style({
            width: "50px",
            height: "50px",
            display: "inline-block",
            textAlign: "center",
            lineHeight: "50px",
            fontSize: "20px",
            float: "left",
            color:'#99efef'
        })

        text.Style({
            width: "calc(100% - 100px)",
            height: "50px",
            display: "inline-block",
            textAlign: "left",
            lineHeight: "50px",
            fontSize: "20px",
            float: "left",
            color: props.text_color || '#00d8d6',
        })

        arrow.Style({
            width: "50px",
            height: "50px",
            display: "inline-block",
            textAlign: "center",
            lineHeight: "50px",
            fontSize: "20px",
            float: "left",
        })


        if(props.icon.includes('car-')){
            icon.Classes([props.icon])
        }else{
            icon.Classes(["material-icons"])
            icon.innerText = props.icon;
        }
        arrow.Classes(["material-icons"])

        text.innerText = props.text;
        arrow.innerText = "keyboard_arrow_right";

        this.Append([icon, text, arrow])
    }
}

customElements.define('list-item', ListItem);
export default ListItem;

