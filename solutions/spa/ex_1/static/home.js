homecomponent = {
    route: '/',
    template: /* html */ `
    <h1>Home</h1>
    <p id="welcome">Welcome home!</p>
    `,
    data: {

    },
    start: async function(){
        if (this.data.user){
            document.getElementById("welcome").innerText= 
                "Welcome "+ this.data.user.name + "!";
        } else {
            try{
                const reply = await fetch("/user")
                if (reply.status == 200){
                    this.data.user = await reply.json();
                    document.getElementById("welcome").innerText= 
                        "Welcome "+ this.data.user.name + "!";
                }
            } catch(error) {
                console.log(error)
            }
        }
    }
    
}