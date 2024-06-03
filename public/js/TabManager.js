class TabManager{
    constructor(props){
        this.tabs = [];
        this.current_tab_index = 0;
        this.container = props.container;
        this.tab_height = props.tab_height || "40px";
        this.container.append(this._init_html_skeleton());
    }

    addTab(tab){
        if(window.utils.get_cookie('user') == null && tab.text != "Login"){
            return;
        }
        //check if tab already exists do not check wih _id because it will never match
        let exists = this.tabs.find((t) => {
            return t.text == tab.text;
        })

        if(exists){
            this.current_tab_index = this.tabs.findIndex((t) => {
                return t.text == tab.text;
            })
            this.update();
            return;
        }

        this.current_tab_index = this.tabs.length;
        this.tabs.push(tab);
        this.update();
    }

    removeTab(tab){
        this.current_tab_index = this.tabs.length - 2;
        this.tabs = this.tabs.filter((t) => {
            return t.id != tab.id;
        })
        this.update();
    }

    _init_html_skeleton(){
        this.tab_container = document.createElement("div");
        this.tab_bar = document.createElement("div");
        this.tab_content = document.createElement("div");

        this.tab_container.Style({
            width: "100%",
            height: "100%",
            display: "block",
            position: "relative",
        })

        this.tab_bar.Style({
            width: "calc(100% - 20px)",
            height: this.tab_height,
            display: "block",
            backgroundColor: "#1e272e",
            position: "relative",
            zIndex: 1000,
            marginLeft: "10px",
        })

        this.tab_content.Style({
            width: "calc(100% - 20px)",
            height: `calc(100% - ${this.tab_height} - 10px)`,
            display: "block",
            position: "relative",
            backgroundColor: "#181f25",
            overflow: "auto",
            marginLeft: "10px",
            marginBottom: "10px",
            borderRadius: "10px"
        })


        this.tab_container.tab_bar = this.tab_bar;
        this.tab_container.tab_content = this.tab_content;
        this.tab_container.append(this.tab_bar, this.tab_content);

        //create initial tab. and new tab button
        return this.tab_container;
    }

    update(){
        this.tab_bar.innerHTML = "";
        this.tab_content.innerHTML = "";
        
        this.tabs.forEach((tab) => {
            let tab_el = document.createElement("div");
            let tab_text = document.createElement("span");
            let tab_exit = document.createElement("span");

            tab.el = tab_el;
            
            tab_el.Style({
                width: ((tab.text.length > 13 ? 13 : tab.text.length) * 7.5) + 45 + "px",
                fontWidth:'10px',
                fontFamily: 'monospace',
                lineHeight: `calc(${this.tab_height} - 10px)`,
                display: "inline-block",
                position: "relative",
                color: "#fff",
                textAlign: "center",
                lineHeight: `calc(${this.tab_height} - 10px)`,
                cursor: "pointer",
                backgroundColor: "#1e272e",
                marginTop: "10px",
                marginLeft: "5px",
                fontSize: "14px",
                borderRadius: "10px 10px 0px 0px",
                float: "left",
                userSelect: "none",
            })

            tab_text.Style({
                position: "relative",
                float: "left",
                marginLeft: "10px",
                maxWidth: "100px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            })

            tab_exit.Style({
                position: "relative",
                float: "right",
                right:'10px',
                lineHeight: `calc(${this.tab_height} - 10px)`,
                cursor: "pointer",
                fontSize: "14px",
                color: "#ff3f34"
            })
            tab_text.innerText = tab.text;
            tab_exit.classList.add("material-icons");
            tab_exit.innerText = "close";
            tab_el.setAttribute("id", tab.id);
            tab_el.append(tab_text, tab_exit);

            tab_exit.onclick = (e) => {
                if(this.tabs.length == 1){
                    return;
                }
                e.stopPropagation();
                this.removeTab(tab);
            }

            tab_el.onclick = (e) => {
                this.current_tab_index = this.tabs.findIndex((t) => {
                    return t.id == tab.id;
                })  
                this.update();
            }
    
            this.tab_bar.append(tab_el);
        })

        let current_tab = this.tabs[this.current_tab_index];
        current_tab.el.Style({
            backgroundColor: "#181f25",
        })
        this.tab_content.append(current_tab.content);

        let new_tab_button = document.createElement("span");
        new_tab_button.classList.add("material-icons");
        new_tab_button.innerText = "add";
        new_tab_button.Style({
            position: "relative",
            lineHeight: `calc(${this.tab_height} - 10px)`,
            height: `calc(${this.tab_height} - 10px)`,
            padding:'0px',
            marginTop: "10px",
            display: "inline-block",
            float:'left',
            cursor:'pointer',
            color:'#0f1417',
            userSelect: "none",
        })

        new_tab_button.onclick = () => {
            this.addTab(this.Tab({}))
        }

        this.tab_bar.append(new_tab_button);
    }

    Tab(props){
        return{
            id: Math.floor(Math.random() * 1000000000).toString(),
            order: props.order || 0,
            text: props.text || "Home",
            content: props.content || new window.HomeView(),
        }
    }
}


export default TabManager