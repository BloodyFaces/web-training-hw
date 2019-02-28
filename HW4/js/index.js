(function addOnChange() {
    var radioArray = document.getElementsByName("groupWorker");
    for (var i = 0; i < radioArray.length; i++) {
        radioArray[i].onclick = function (event) {
            var extraBlock = document.getElementById("extra");
            while (extraBlock.firstChild) {
                extraBlock.removeChild(extraBlock.firstChild);
            }
            switch (event.currentTarget.value) {
                case "2":
                    var inputTool = document.createElement("input");
                    inputTool.type = "text";
                    inputTool.placeholder = "Tool";
                    inputTool.id = "tool";
                    inputTool.required = true;
                    extraBlock.appendChild(inputTool);
                    break;
                case "3":
                    var inputTransport = document.createElement("input");
                    inputTransport.type = "text";
                    inputTransport.placeholder = "Transport";
                    inputTransport.id = "transport";
                    inputTransport.required = true;
                    extraBlock.appendChild(inputTransport);
                    extraBlock.appendChild(document.createElement("br"));
                    var selectDriver = document.createElement("select");
                    selectDriver.id = "driverCtgry";
                    var option = document.createElement("option");
                    option.value="A";
                    option.innerHTML="Category A";
                    selectDriver.appendChild(option);
                    option = document.createElement("option");
                    option.value="B";
                    option.innerHTML="Category B";
                    selectDriver.appendChild(option);
                    option = document.createElement("option");
                    option.value="C";
                    option.innerHTML="Category C";
                    selectDriver.appendChild(option);
                    option = document.createElement("option");
                    option.value="D";
                    option.innerHTML="Category D";
                    selectDriver.appendChild(option);
                    extraBlock.appendChild(selectDriver);
                    break;
                default:
                    break;
            }
        };
    }
})();