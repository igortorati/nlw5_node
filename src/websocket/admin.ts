import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";

io.on("connect", async (socket) =>{
    const connectionsService = new ConnectionsService();
    const messagesService = new MessagesService();
    // Recupero todos os usuários não atendidos
    const allConnectionWithoutAdmin = await connectionsService.findAllWithoutAdmin();

    // Envio para todos os admins a lista de usuários que ainda não foram atendidos
    io.emit("admin_list_all_users", allConnectionWithoutAdmin);

    // Envio a lista de mensagens do usuário selecionado
    socket.on("admin_list_messages_by_user", async (params, callback) =>{
        const { user_id } = params;

        const allMessages = await messagesService.listByUser(user_id);
        
        callback(allMessages);
    });
});
