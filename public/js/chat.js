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
    const messagesContainer = document.getElementById('messagesContainer')
    messagesContainer.innerHTML =`
        <div id="messagesContainer">
            <table class="table">
                <tbody id="messagesTable">
                </table>
            </tbody>
        </div>
    `
    try {
        
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
    } catch (error) {
        
        messagesContainer.innerHTML = '<p> No hay mensajes para mostrar </p>'
    }

}
const email = document.getElementById('email')
const emailToView = document.getElementById('emailToView')
email.addEventListener("change",()=>{
    emailToView.innerHTML = email.value
})
const viewChatForEmail=()=>{
    console.log(email.value);
    window.location.href = `/chat/ver/${email.value}`
    return false
}
socket.on("chat", function ({messages}) {
    console.log(messages);
    renderMessages(messages);
});