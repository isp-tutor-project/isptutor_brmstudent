/*
let indexStart = location.href.indexOf("?");
if (indexStart != -1) {
    let restOfString = location.href.substring(indexStart+1);
    let entries = restOfString.split("&");
    console.log(entries);
    for (let entry of entries) {
        if (entry == "") continue;
        let parts = entry.split("=");
        let key = parts[0];
        let value = parts[1];
        console.log(key + ":" + value);
        if (key == "name") {
            localStorage.setItem("isptutor_userID", value);
        }
        else if (key == "study") {
            localStorage.setItem("isptutor_collectionID", value);
        }
        else {
            console.error("Invalid param");
        }
    }

}
*/