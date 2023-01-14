const { notFoundMessage } = require("../utils/costans");
const httpError = require("http-errors");
const { Kind } = require("graphql");

function parseObject(valueNode){
    const value = Object.create(null);
    valueNode.fields.forEach(field => {
        value[field.name.value] = parseValueNode(field.value)
    });
    return value
}
function parseValueNode(valueNode){
    switch(valueNode.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
            return valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT:
            return parseObject(valueNode.value)
        case Kind.LIST:
            return valueNode.values.map(parseValueNode)
        default:
            return null
    }
}
function toObject(value){
    if(typeof value === "Object")
        return value;
    if(typeof value === "string" && value.charAt(0) === "{")
        return JSON.parse(value);
    return null
}
function parsedLiteral(valueNode){
    switch(valueNode.kind){
        case Kind.STRING:
            return valueNode.value.charAt(0) === "{" ? JSON.parse(valueNode.value) : valueNode.value
        case Kind.INT:
            return Number(valueNode.value)
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT:
    }
}
async function checkExistModel(model, id){
    const result = await model.findById(id);
    if(!result) throw httpError.NotFound(notFoundMessage("model"));
    return result
}

module.exports = {
    parseObject,
    parseValueNode,
    toObject,
    parsedLiteral,
    checkExistModel
}