let step = 0;
let started = false;
const order = {
name: "",
phone: "",
quantity: "",
address: ""
};

function startOrder(){

    if(started) return;

    started = true;

    document.getElementById("orderBtn").style.display = "none";

    addMessage(
        "👋 Great choice! What is your name?",
        "bot"
    );

}

function addMessage(text, type) {

const chatBox = document.getElementById("chat-box");

const div = document.createElement("div");

div.className =
    type === "user"
    ? "user-message"
    : "bot-message";

div.innerHTML = text;

chatBox.appendChild(div);

chatBox.scrollTop = chatBox.scrollHeight;

}

function sendMessage() {
const input = document.getElementById("userInput");

const value = input.value.trim();

if (value === "") return;

addMessage(value, "user");

input.value = "";

if (step === 0) {

    order.name = value;

    addMessage(
        "📞 Please enter your phone number:",
        "bot"
    );

    step++;
}

else if (step === 1) {

    order.phone = value;

    addMessage(
        "🔢 How many projectors do you need?",
        "bot"
    );

    step++;
}

else if (step === 2) {

    order.quantity = value;

    addMessage(
        "📍 Enter your delivery address:",
        "bot"
    );

    step++;
}

else if (step === 3) {

order.address = value;

fetch("https://script.google.com/macros/s/AKfycbwiM2g4OW0GFmB4JVuQImCWtWRm2Gb6s8hIBorbAS0UJKeMRs5SFwd2Ne09OtlW46OJ/exec", {
    method: "POST",
    body: JSON.stringify(order)
})
.then(response => response.json())
.then(data => {

    addMessage(
        "✅ Thank you " + order.name +
        "!<br><br>" +
        "📦 Order Summary<br><br>" +
        "📞 Phone: " + order.phone + "<br>" +
        "🔢 Quantity: " + order.quantity + "<br>" +
        "📍 Address: " + order.address +
        "<br><br>Order submitted successfully!",
        "bot"
    );

})
.catch(error => {

    addMessage(
        "❌ Failed to save order. Please try again.",
        "bot"
    );

    console.error(error);

});

step++;

}

}
