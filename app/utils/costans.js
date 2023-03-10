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
    EXIST_NAME : "This name has already been chosen",
    NO_COMMENT : "Comments are not allowed",
    FALSE_ID : "ObjectID is not correct",
    LIKE : "You liked this content",
    UNLIKE : "You unliked this content",
    DISLIKE : "Your dislike has been registered",
    UN_DISLIKE : "Your dislike has been removed",
    BOOKMARK : "You bookmarked this content",
    UN_BOOKMARK : "You unbookmarked this content",
    ADD_BASKET : "Successfully added to cart",
    DEL_BASKET : "Successfully removed from cart",
    MINUS_BASKET : "A product removed from your cart successfully",
    EXIST_COURSE : "This course has already been added to the cart",
    EMPTY_BASKET : "Your cart is empty!",
    BUY : "To buy courses or products",
    PARAMETERS : "The sent parameters are not correct",
    OK_PAYMENT : "Your payment has been completed successfully",
    NO_PAYMENT : "Your payment failed",
    PAID : "This transaction is already paid",
};
Object.freeze(PROCCESS_MASSAGES);

module.exports = {
    ROLES,
    PERMISSIONS,
    NULLISH_DATA,
    PROCCESS_MASSAGES,
    mongoIdPattern : /^(?=[a-f\d]{24}$)(\d+[a-f]+\d)/i ,
    phoneNumberPattern : /^09[0-9]{9}$/ ,
    ACCESS_TOKEN_SECRET_KEY : "624FA5D98FF08F7F743CB6CB388C28F6AE38B7CEEB4AB8275A4811217F099DE3",
    REFRESH_TOKEN_SECRET_KEY : "82D01DD923435F21C5B9DE73013C6F7E29FEE57C1085C0FFACA1C2017909A116",
    COOKIE_PARSER_SECRET_KEY : "8059C2FFD36592DE611A77A1DB7F5F04EFC7428CB20406A71EB96F6516C5CC50"
}