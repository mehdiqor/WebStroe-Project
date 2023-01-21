const NameSpaceSocketHandler = require("./namespaces.socket")

module.exports = {
    socketHandler : (io) => {
        new NameSpaceSocketHandler(io).initConnection()
        new NameSpaceSocketHandler(io).createNamespacesConnection()
    }
}