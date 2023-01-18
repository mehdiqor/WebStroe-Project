const NameSpaceSocketHandler = require("./namespaces.socket")

module.exports = {
    socketHandler : (io) => {
        new NameSpaceSocketHandler(io).initConnection()
    }
}