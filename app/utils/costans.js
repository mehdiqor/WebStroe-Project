const NULLISH_DATA = {
    EMPTY_STRING : "", 
    SPACE_STRING : " ", 
    ZREO_STRING : "0", 
    ZERO : 0, 
    NULL : null, 
    UNDEFINED : undefined, 
    NOT_NUMBER : NaN
};
Object.freeze(NULLISH_DATA);
const PROCCESS_MASSAGES = {
    CAREATED : "The creation process was successfull",
    NOT_CAREATED : "The creation process failed",
    UPDATED : "The update process was successfull",
    NOT_UPDATED : "The update process failed",
    DELETED : "The deletion process was successful",
    NOT_DELETED : "The deletion process failed",
    FREE_COURSES : "No price can be set for the free courses",
    LOGIN : "Please login to your account",
    NO_LOGIN : "Login failed",
    NO_USER : "User not found",
    OTP : "Verification code sent successfully",
    INVALID_OTP : "Verification code is invalid",
    EXPIRED_OTP : "The verification code has expired",
    NO_PERMISSION : "You do not have permission for this section",
    EXIST_PERMISSION : "Permission is already registered",
    EXIST_ROLE : "Role is already registered",
};
Object.freeze(PROCCESS_MASSAGES);
const ROLES = {
    USER : 'USER',
    ADMIN : 'ADMIN',
    TEACHER : 'TEACHER',
    SUPPLIER : 'SUPPLIER',
    CONTENT_MANAGER : 'CONTENT_MANAGER'
};
Object.freeze(ROLES);
const PERMISSIONS = {
    SUPERADMIN : ['all'],
    ADMIN : ['blog', 'course', 'category', 'product', 'developer'],
    CONTENT_MANAGER : ['blog', 'course', 'category', 'product'],
    TEACHER : ['blog', 'course'],
    SUPPLIER : ['product'],
    USER : ['profile'],
    ALL : 'all'
};
Object.freeze(PERMISSIONS);
function validationError(title){
    return `${title} is not VALID! please try again`
};
function notFoundMessage(title){
    return `Oops!... ${title} NOT FOUND!`
};

module.exports = {
    ROLES,
    NULLISH_DATA,
    PERMISSIONS,
    PROCCESS_MASSAGES,
    validationError,
    notFoundMessage,
    mongoIdPattern : /^(?=[a-f\d]{24}$)(\d+[a-f]+\d)/i ,
    phoneNumberPattern : /^09[0-9]{9}$/ ,
    ACCESS_TOKEN_SECRET_KEY : "624FA5D98FF08F7F743CB6CB388C28F6AE38B7CEEB4AB8275A4811217F099DE3",
    REFRESH_TOKEN_SECRET_KEY : "82D01DD923435F21C5B9DE73013C6F7E29FEE57C1085C0FFACA1C2017909A116"
}