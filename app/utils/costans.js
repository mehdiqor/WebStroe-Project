const BlackList = {
    BOOKMARKS : "bookmarks",
    LIKES : "likes",
    DSILIKES : "dislikes",
    COMMENTS : "comments",
    SUPPLIER : "supplier",
    LENGTH : "length",
    WIDTH : "width",
    HEIGHT : "height",
    WEIGHT : "weight"
};
Object.freeze(BlackList);
const nullishData = {
    EMPTY_STRING : "", 
    SPACE_STRING : " ", 
    ZREO_STRING : "0", 
    ZERO : 0, 
    NULL : null, 
    UNDEFINED : undefined, 
    NOT_NUMBER : NaN
};
Object.freeze(nullishData);

module.exports = {
    BlackList,
    nullishData,
    mongoIdPattern : /^(?=[a-f\d]{24}$)(\d+[a-f]+\d)/i ,
    ROLES : {
        USER : 'USER',
        ADMIN : 'ADMIN',
        WRITER : 'WRITER',
        TEACHER : 'TEACHER',
        SUPPLIER : 'SUPPLIER'
    },
    ACCESS_TOKEN_SECRET_KEY : "624FA5D98FF08F7F743CB6CB388C28F6AE38B7CEEB4AB8275A4811217F099DE3",
    REFRESH_TOKEN_SECRET_KEY : "82D01DD923435F21C5B9DE73013C6F7E29FEE57C1085C0FFACA1C2017909A116"
}