function reverseString(str) {
    return str.split("").reverse().join("");
}

function hasNumber(str) {
    return /\d/.test(str);
}

function checkUsername() {
    var username = prompt("Provide username");
    if (username == null || username == "") {
        alert("Initial username has been provided!!!");
        return;
    }

    if (hasNumber(username)) {
        alert(username.toUpperCase());
    } else {
        alert(reverseString(username));
    }
}