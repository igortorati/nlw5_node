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

    socket.on("admin_send_message", async (params) =>{
        const {user_id, text } = params;

        // Cria a mensagem no MessageService
        await messagesService.create({
            text,
            user_id,
            admin_id: socket.id,
        });

        // recupera o socket do usuário com base no id
        const { socket_id } = await connectionsService.findByUserId(user_id);
    
        io.to(socket_id).emit("admin_send_to_client", {
            text: text,
            socket_id: socket.id,
        });
    });

    // Específicar que o usuário foi atendido e remover ele da lista de não atendidos
    socket.on("admin_user_in_support", async params =>{
        const { user_id } = params;
        await connectionsService.updateAdminId(user_id, socket.id);
        
        const allConnectionWithoutAdmin = await connectionsService.findAllWithoutAdmin();

        io.emit("admin_list_all_users", allConnectionWithoutAdmin);
    });
});
