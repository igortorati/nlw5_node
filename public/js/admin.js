const socket = io();
let connectionsUsers = [];

// solicita todos os usuários ainda não atendidos
socket.on("admin_list_all_users", (connections) => {
  connectionsUsers = connections;
  connections.forEach(connection => {
    document.getElementById("list_users").innerHTML = "";
    let template = document.getElementById("template").innerHTML;
    connections.forEach(connection => {
      const rendered = Mustache.render(template, {
        email: connection.user.email,
        id: connection.socket_id
      })

      // exibe os usuários ainda não atendidos
      document.getElementById("list_users").innerHTML += rendered;
    });
  });
});


function call(id) {
  // recupera a conexão do usuário escolhido para atendimento
  const connection = connectionsUsers.find(
    (connection) => connection.socket_id === id
  );

  const template = document.getElementById("admin_template").innerHTML;

  const rendered = Mustache.render(template, {
    email: connection.user.email,
    id: connection.user_id,
  });

  // exibe chat para usuários em atendimento
  document.getElementById("supports").innerHTML += rendered;

  const params = {
    user_id: connection.user_id
  };

  // solicita as mensagens do usuário
  socket.emit("admin_list_messages_by_user", params, messages => {
    console.log("Messages", messages)
  });
}
