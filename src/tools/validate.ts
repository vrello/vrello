export const validateJSON = (json: any) => {
    try {
        var o = JSON.parse(json);

        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
}