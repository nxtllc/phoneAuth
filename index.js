async function validateAuthData(authData, options) {
    const uq = new Parse.Query("UserOpt");
    console.log(authData);
    uq.equalTo("phoneNumber", authData.id);
    uq.equalTo("opt", authData.opt);
    var object;
    try {
        object = await uq.first();
    } catch (err) {
        console.log(err);
        throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, "Otp exception");
    }
    console.log("selected object ", object);
    if (object) {
        console.log("opt saving used");
        if (!object.get("is_used")) {
            console.log("opt saving used");
            object.set("is_used", true);
            object.save();
            return Promise.resolve(authData);
        } else {
            throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, "Otp is used");
        }
    } else {
        throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, "Otp is not found");
    }
}

function validateAppId(appIds, authData, options) {
    console.log("PHONE", authData);
    return Promise.resolve({});
}

module.exports = {
    validateAppId,
    validateAuthData
};
