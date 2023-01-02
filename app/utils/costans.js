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
const ROLES = {
    USER : 'USER',
    ADMIN : 'ADMIN',
    TEACHER : 'TEACHER',
    SUPPLIER : 'SUPPLIER',
    CONTENT_MANAGER : 'CONTENT_MANAGER'
};
Object.freeze(ROLES);
const PERMISSIONS = {
    USER : ['profile'],
    ADMIN : ['all'],
    SUPERADMIN : ['all'],
    ALL : 'all',
    CONTENT_MANAGER : ['blog', 'course', 'category', 'product'],
    TEACHER : ['course', 'blog'],
    SUPPLIER : ['product'],
};
Object.freeze(PERMISSIONS);
function validationError(title){
    return `the ${title} is not VALID! please try again`
}

module.exports = {
    nullishData,
    PERMISSIONS,
    ROLES,
    validationError,
    mongoIdPattern : /^(?=[a-f\d]{24}$)(\d+[a-f]+\d)/i ,
    ACCESS_TOKEN_SECRET_KEY : "624FA5D98FF08F7F743CB6CB388C28F6AE38B7CEEB4AB8275A4811217F099DE3",
    REFRESH_TOKEN_SECRET_KEY : "82D01DD923435F21C5B9DE73013C6F7E29FEE57C1085C0FFACA1C2017909A116"
}