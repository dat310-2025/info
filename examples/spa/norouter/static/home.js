homecomponent = {
    route: '/',
    template: /* html */ `
    <h1>Home</h1>
    <p id="welcome">Welcome home!</p>
    `,
    start: async function(){
        try{
            const reply = await fetch("/user")
            if (reply.status == 200){
                user = await reply.json();
                document.getElementById("welcome").innerText= "Welcome "+ user.name + "!";
            }
        } catch(error) {
            console.log(error)
        }
    }
}