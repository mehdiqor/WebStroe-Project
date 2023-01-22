const { ConversationModel } = require("../models/conversation");

module.exports = class NameSpaceSocketHandler{
    #io;
    constructor(io){
        this.#io = io
    }
    initConnection(){
        this.#io.on("connection", async socket => {
            const namespaces = await ConversationModel.find({}, {title : 1, endpoint : 1}).sort({_id : -1});
            socket.emit("namespacesList", namespaces)
        })
    }
    async createNamespacesConnection(){
        const namespaces = await ConversationModel.find({}, {title : 1, endpoint : 1, rooms : 1}).sort({_id : -1});
        for (const namespace of namespaces) {
            this.#io.of(`/${namespace.endpoint}`).on("connection", async socket => {
                const conversaion = await ConversationModel.findOne({endpoint : namespace.endpoint}, {rooms : 1}).sort({_id : -1});
                socket.on("joinRoom", async roomName => {
                    const lastRoom = Array.from(socket.rooms)[1]
                    if(lastRoom){
                        socket.leave(lastRoom)
                        await this.getCountOfOnlineUsers(namespace.endpoint, roomName)
                    }
                    socket.join(roomName);
                    await this.getCountOfOnlineUsers(namespace.endpoint, roomName)
                    const roomInfo = conversaion.rooms.find(item => item.name == roomName)
                    socket.emit("roomInfo", roomInfo)
                    this.getNewMessage(socket)
                    socket.on("disconnect", async() => {
                        await this.getCountOfOnlineUsers(namespace.endpoint, roomName)
                    })
                })
                socket.emit("roomlist", conversaion.rooms)
            })
        }
    }
    async getCountOfOnlineUsers(endpoint, roomName){
        const onlineUsers = await this.#io.of(`/${endpoint}`).in(roomName).allSockets()
        this.#io.of(`/${endpoint}`).in(roomName).emit("countOfOnlineUsers", Array.from(onlineUsers).length)
    }
    getNewMessage(socket){
        socket.on("newMessage", async data => {
            const {message, roomName, endpoint, sender} = data
            await ConversationModel.updateOne({endpoint, "rooms.name" : roomName}, {
                $push : {
                    "rooms.$.messages" : {
                        sender,
                        message,
                        dataTime : Date.now()
                    }
                }
            })
            this.#io.of(`/${endpoint}`).in(roomName).emit("confirmMessage", data)
        })
    }
}