const { graphqlSchema } = require("../graphql/index.graphql")

function qraphqlConfig(req, res){
    return {
        schema : graphqlSchema,
        graphiql : true,
        context : {req, res}
    }
}

module.exports = {
    qraphqlConfig
}