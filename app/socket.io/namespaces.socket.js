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
                socket.on("joinRoom", roomName => {
                    const lastRoom = Array.from(socket.rooms)[1]
                    if(lastRoom){
                        socket.leave(lastRoom)
                    }
                    socket.join(roomName);
                    const roomInfo = conversaion.rooms.find(item => item.name == roomName)
                    socket.emit("roomInfo", roomInfo)
                })
                socket.emit("roomlist", conversaion.rooms)
            })
        }
    }
}