document.querySelector("#start_chat").addEventListener("click", (event) => {
    const socket = io();

    const chat_help = document.getElementById("chat_help");
    chat_help.style.display = "none";

    const chat_in_support = document.getElementById("chat_in_support");
    chat_in_support.style.display = "block";

    const email = document.getElementById("email").value;
    const text = document.getElementById("txt_help").value;

    

    socket.on("connect", () => { // A partir do momento que estiver conectado
        const params = {
            email,
            text,
        }
        socket.emit("client_first_access", params, (call, err) => {
            if (err) {
                console.err(err);
            } else {
                console.log(call);
            }
        });
    });

    // Recuperando todas as mensagens daquele usuário
    socket.on("client_list_all_messages", (message) => {
        var template_client = document.getElementById("message-user-template").innerHTML;
        var template_admin = document.getElementById("admin-template").innerHTML;
        console.log(message);
        message.forEach((message) => {
            // Caso a mensagem não tenho o id do admin é uma mensagem enviada pelo cliente
            if(message.admin_id === null) {
                const rendered = Mustache.render(template_client, {
                    message: message.text,
                    email
                })
                // adiciona informação
                document.getElementById("messages").innerHTML += rendered;
            } else {
                const rendered = Mustache.render(template_admin, {
                    message_admin: message.text
                });
                document.getElementById("messages").innerHTML += rendered;
            }
        });
    });
});
