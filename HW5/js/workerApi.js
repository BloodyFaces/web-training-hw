function Worker(name, surname, age, gender, company, salary) {

    var name = name;
    var surname = surname;
    var age = age;
    var gender = gender;
    var company = company;
    var salary = salary;

    this.getName = function () {
        return name;
    }

    this.setName = function (value) {
        name = value;
    }

    this.getSurname = function () {
        return surname;
    }

    this.setSurname = function (value) {
        surname = value;
    }

    this.getAge = function () {
        return age;
    }

    this.setAge = function (value) {
        if (isNaN(value) || value > 100 || value < 16) {
            throw new Error("Invalid age is provided!");
        }
        age = value;
    }

    this.getGender = function () {
        return gender;
    }

    this.setGender = function (value) {
        if (value === "male" || value === "female") {
            gender = value;
        } else {
            throw new Error("Invalid gender. Possible values: 'male' or 'female'!");
        }
    }

    this.getCompany = function () {
        return company;
    }

    this.setCompany = function (value) {
        company = value;
    }

    this.getSalary = function () {
        return salary;
    }

    this.setSalary = function (value) {
        if (isNaN(value)) {
            throw new Error("Invalid salary. Number should be provided!");
        }
        salary = value;
    }

}

Worker.prototype.getObj = function () {
    return { 
                name: this.getName(),
                surname: this.getSurname(),
                age: this.getAge(),
                gender: this.getGender(),
                company: this.getCompany(),
                salary: this.getSalary() 
           };
}


function FactoryWorker(name, surname, age, gender, company, salary, tool) {

    Worker.apply(this, [name, surname, age, gender, company, salary]);

    var tool = tool;

    this.getTool = function () {
        return tool;
    }

    this.setTool = function (value) {
        tool = value;
    }

}

FactoryWorker.prototype = Object.create(Worker.prototype);
FactoryWorker.prototype.constructor = FactoryWorker;

FactoryWorker.prototype.getObj = function () {
    var obj = Worker.prototype.getObj.apply(this, arguments);
    obj.tool = this.getTool();
    return obj;
}

function TransportWorker(name, surname, age, gender, company, salary, transport, driverCategory) {

    Worker.apply(this, [name, surname, age, gender, company, salary]);

    var transport = transport;
    var driverCategory = driverCategory;

    this.getTransport = function () {
        return transport;
    }

    this.setTransport = function (value) {
        transport = value;
    }

    this.getDriverCategory = function () {
        return driverCategory;
    }

    this.setDriverCategory = function (value) {
        if (["A", "B", "C", "D"].indexOf(value) !== -1) {
            driverCategory = value;
        } else {
            throw new Error("Invalid driver category value!");
        }
    }

}

TransportWorker.prototype = Object.create(Worker.prototype);
TransportWorker.prototype.constructor = TransportWorker;
TransportWorker.prototype.getObj = function () {
    var obj = Worker.prototype.getObj.apply(this, arguments);
    obj.transport = this.getTransport();
    obj.driverCategory = this.getDriverCategory();
    return obj;
}

var workerList = [];

function createWorkerDiv(object) {
    var div = document.createElement("div");
    div.className = "worker";
    var pName = document.createElement("p");
    pName.innerHTML = object.getName();
    div.appendChild(pName);
    var pSurname = document.createElement("p");
    pSurname.innerHTML = object.getSurname();
    div.appendChild(pSurname);
    var pAge = document.createElement("p");
    pAge.innerHTML = object.getAge();
    div.appendChild(pAge);
    var pGender = document.createElement("p");
    pGender.innerHTML = object.getGender();
    div.appendChild(pGender);
    var pCompany = document.createElement("p");
    pCompany.innerHTML = object.getCompany();
    div.appendChild(pCompany);
    var pSalary = document.createElement("p");
    pSalary.innerHTML = object.getSalary();
    div.appendChild(pSalary);
    if (!(typeof object.getTool === 'undefined')) {
        var pTool = document.createElement("p");
        pTool.innerHTML = object.getTool();
        div.appendChild(pTool);
    }
    if (!(typeof object.getTransport === 'undefined')) {
        var pTransport = document.createElement("p");
        pTransport.innerHTML = object.getTransport();
        div.appendChild(pTransport);
    }
    if (!(typeof object.getDriverCategory === 'undefined')) {
        var pDriverCategory = document.createElement("p");
        pDriverCategory.innerHTML = object.getDriverCategory();
        div.appendChild(pDriverCategory);
    }
    return div;
}

function onAddClick(event) {
    var worker = undefined;
    switch(event.groupWorker.value) {
        case "1":
            worker = new Worker(event.name.value, event.surname.value, parseInt(event.age.value), 
                                event.gender.value, event.company.value, parseInt(event.salary.value));
            break;
        case "2":
            worker = new FactoryWorker(event.name.value, event.surname.value, parseInt(event.age.value), event.gender.value, 
                                       event.company.value, parseInt(event.salary.value), event.tool.value);
            break;
        case "3":
            worker = new TransportWorker(event.name.value, event.surname.value, parseInt(event.age.value), event.gender.value, 
                                         event.company.value, parseInt(event.salary.value), event.transport.value, event.driverCtgry.value); 
            break;
        default:
            break;
    }
    var div = createWorkerDiv(worker);
    workerList.push(worker);
    var container = document.getElementById("container");
    container.appendChild(div);
    return;
}

function downloadXML() {
    var xmlSerializer = new XMLSerializer();
    var xmlString = xmlSerializer.serializeToString(document.getElementById("container"));
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var blob = new Blob([xmlString], {type: "octet/stream"});
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = "workers.xml";
    a.click();
    window.URL.revokeObjectURL(url);
}

function downloadJSON() {
    var jsonList = [];
    workerList.map((item) => {
        jsonList.push(item.getObj());
    });
    var json = JSON.stringify(jsonList);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var blob = new Blob([json], {type: "octet/stream"});
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = "workers.json";
    a.click();
    window.URL.revokeObjectURL(url);
}

(function startup() {
    var worker = new Worker("Thomas", "Macwell", 25, "male", "IBQ", 2000);
    var workerAtFactory = new FactoryWorker("John", "Owell", 20, "male", "Nestler", 1000, "conveyor");
    var workerAtTransport = new TransportWorker("Anabet", "Krus", 32, "female", "American Buslines", 500, "bus", "D");
    workerList.push(worker);
    workerList.push(workerAtFactory);
    workerList.push(workerAtTransport);
    var container = document.getElementById("container");
    workerList.map((item) => {
        var div = createWorkerDiv(item);
        container.appendChild(div);
    });
})();