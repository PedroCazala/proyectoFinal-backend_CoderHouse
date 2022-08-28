//websocket
const socket = io.connect();

const deletedOneChat = (id) =>{
    axios.delete(`/chat/api/${id}`)
    .then(res=>{
        console.log(res);
    })
    .then(()=>
    socket.emit('newChat')
)
}

const addMessage = () =>{
    const newMessage = {
        email: document.getElementById('email').value,
        body: document.getElementById('body').value,
    };
    // console.log(newMessage);
    axios.post('/chat/api',newMessage)
    .then(res=>{
        console.log('respuesta desde chat.js 2',res);
    })
    .then(()=>
        socket.emit('newChat')
    )
    return false
}

const renderMessages = (messages)=>{
    document.getElementById('body').value = ""
    const html =messages
        .map(message => {
            return `
                <tr>
                    <th scope="row">
                        ${ message._id }
                    </th>
                    <td class="mail">
                        ${ message.email }
                    </td>
                    <td class="date">
                        ${ message.date }
                    </td>
                    <td class="message">
                        ${ message.body }
                    </td>
                    <td>
                        <button id="btnDeletedOne" onclick= "deletedOneChat('${message._id}')">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `
        })
        .join(" ")

    const messagesTable = document.getElementById('messagesTable')
    messagesTable.innerHTML = html

}

socket.on("chat", function (messages) {
    renderMessages(messages);
});

