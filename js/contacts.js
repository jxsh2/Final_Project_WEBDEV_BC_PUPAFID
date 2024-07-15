document.addEventListener("DOMContentLoaded", function() {
    const firebaseConfig = {
        apiKey: "AIzaSyCv_lJDALzLQT-DeZ6xjxJSsJveWE4MhF4",
        authDomain: "pupfafidform.firebaseapp.com",
        databaseURL: "https://pupfafidform-default-rtdb.firebaseio.com",
        projectId: "pupfafidform",
        storageBucket: "pupfafidform.appspot.com",
        messagingSenderId: "193013345972",
        appId: "1:193013345972:web:141b18da5638ecd152f1e1"
    };

    firebase.initializeApp(firebaseConfig);
    var contactsDB = firebase.database().ref('contactForm');

    const getElementVal = (id) => {
        return document.getElementById(id).value;
    };

    document.getElementById('contact-form').addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault(); // Prevent form redirection

        var fName = getElementVal('firstname');
        var lName = getElementVal('lastname');
        var email = getElementVal('email');
        var message = getElementVal('message');

        saveMessages(fName, lName, email, message);

        // Display success message
        document.getElementById('popup').style.display = 'block';
    }

    const saveMessages = (fName, lName, email, message) => {
        var newcontactsDB = contactsDB.push();
        newcontactsDB.set({
            firstname: fName,
            lastname: lName,
            email: email,
            message: message
        });
    };

    const form = document.getElementById('contact-form');
    const modal = document.getElementById('popup');
    const closeButton = document.querySelector('.close-button');

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        form.reset();
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
