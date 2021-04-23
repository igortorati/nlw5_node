const socket = io();
let connectionsUsers = [];
let connectionsInSupport = [];
// solicita todos os usuários ainda não atendidos
socket.on("admin_list_all_users", (connections) => {
  connectionsUsers = connections;
  document.getElementById("list_users").innerHTML = "";
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
  connectionsInSupport.push(connection);

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

  socket.emit("admin_user_in_support", params);

  // solicita as mensagens do usuário e admin ao sistema
  socket.emit("admin_list_messages_by_user", params, messages => {
    const divMessages = document.getElementById(`allMessages${connection.user_id}`);

    // Cria a div que irá aparecer contendo cada mensagem da conversa, existe uma classe para
    // mensagens do usuário e uma classe para mensagens do admin
    messages.forEach((message) => {
      const createDiv = document.createElement("div");
      if(message.admin_id === null) {
        createDiv.className = "admin_message_client";

        createDiv.innerHTML = `<span>${connection.user.email}</span>`;
        createDiv.innerHTML += `<span>${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_date">${dayjs(message.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>`;
      } else {
        createDiv.className = "admin_message_admin";

        createDiv.innerHTML = `Atendente: <span>${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_date">${dayjs(message.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>`;
      }

      // Adiciona a div criada ao bloco de todas as mensagens
      divMessages.appendChild(createDiv);
    });
  });
}

// Admin envia mensagem ao usuário
function sendMessage(id) {
  // pega a mensagem digitada
  const text = document.getElementById(`send_message_${id}`);

  // constrói objeto contendo os parametros
  const params = {
    text: text.value,
    user_id: id
  };
  
  // emite o evento de mensagem enviada
  socket.emit("admin_send_message", params);

  const divMessages = document.getElementById(`allMessages${id}`);

  const createDiv = document.createElement("div");
  createDiv.className = "admin_message_admin";
  createDiv.className = "admin_message_admin";

  createDiv.innerHTML = `Atendente: <span>${params.text}</span>`;
  createDiv.innerHTML += `<span class="admin_date">${dayjs().format("DD/MM/YYYY HH:mm:ss")}</span>`;

  divMessages.appendChild(createDiv);

  text.value = "";
}

socket.on("admin_receive_message", data => {
  const connection = connectionsInSupport.find(
    (connection) => connection.socket_id === data.socket_id
  );
  const divMessages = document.getElementById(`allMessages${connection.user_id}`);

  const createDiv = document.createElement('div');
  createDiv.className = "admin_message_client";

  createDiv.innerHTML = `<span>${connection.user.email}</span>`;
  createDiv.innerHTML += `<span>${data.message.text}</span>`;
  createDiv.innerHTML += `<span class="admin_date">${dayjs(data.message.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>`;
  
  divMessages.appendChild(createDiv);
});
