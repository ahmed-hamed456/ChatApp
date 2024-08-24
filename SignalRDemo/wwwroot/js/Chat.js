document.addEventListener('DOMContentLoaded', function () {
    var username = prompt("please enter your name : ");

    //Input
    var messageInput = document.getElementById("messageInp");

    var groupeNameInput = document.getElementById("groupNameInp");

    var messageToGroupInput = document.getElementById("messageToGroupInp");

    messageInput.focus();

    //Connection
    var proxyConnection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

    //Send Message
    proxyConnection.start().then(function () {

        document.getElementById("sendMessageBtn").addEventListener("click", function (e) {
            e.preventDefault();
            proxyConnection.invoke("Send", username, messageInput.value);
        });

        document.getElementById("joinGroupBtn").addEventListener("click", function (e) {
            e.preventDefault();
            proxyConnection.invoke("JoinGroup", groupeNameInput.value, username);
        });

        document.getElementById("sendMessageToGroupBtn").addEventListener("click", function (e) {
            e.preventDefault();
            proxyConnection.invoke("SendMessageToGroup", groupeNameInput.value, username, messageToGroupInput.value);
        });


    }).catch(function (error) {
        console.log(error);
    });

    //Show The Message to the other user
    proxyConnection.on("ReceiveMessage", function (userName, message) {
        var listElement = document.createElement('li');
        listElement.innerHTML = `<strong>${userName}: </strong> ${message}`;
        document.getElementById("conversation").appendChild(listElement)
    }) 

    proxyConnection.on("NewMemberJoin", function (userName,groupName ) {
        var listElement = document.createElement('li');
        listElement.innerHTML = `<strong>${userName} has join to ${groupName}</strong>`;
        document.getElementById("groupConversationUL").appendChild(listElement)
    })

    proxyConnection.on("ReceiveMessageFromGroup", function (sender, message) {
        var listElement = document.createElement('li');
        listElement.innerHTML = `<strong>${sender}: </strong> ${message}`;
        document.getElementById("groupConversationUL").appendChild(listElement)
    })
}) 