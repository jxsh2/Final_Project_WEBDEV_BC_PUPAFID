document.addEventListener('DOMContentLoaded', function() {
    const firebaseConfig = {
        apiKey: "AIzaSyCK3p-VBz70mZcjVsdAG9LqXHTyRp3Eu9M",
        authDomain: "idform-39321.firebaseapp.com",
        databaseURL: "https://idform-39321-default-rtdb.firebaseio.com",
        projectId: "idform-39321",
        storageBucket: "idform-39321.appspot.com",
        messagingSenderId: "1039491957830",
        appId: "1:1039491957830:web:284682e2dc7bad0266f647"
    };

    firebase.initializeApp(firebaseConfig);
    var IDFormDB = firebase.database().ref('IDForm');

    // Utility function to get form values
    const getElementVal = (id) => {
        return document.getElementById(id).value;
    };

    // Event listener for form submission
    document.getElementById('applicationForm').addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();

        var reason = getElementVal('reason');
        var affiliation = getElementVal('affiliation');
        var studentNumber = getElementVal('studentNumber');
        var firstName = getElementVal('firstName');
        var middleName = getElementVal('middleName');
        var lastName = getElementVal('lastName');
        var gender = getElementVal('gender');
        var dob = getElementVal('dob');
        var college = getElementVal('college');
        var cys = getElementVal('course-year-sec');
        var homeAddress = getElementVal('homeAddress');
        var email = getElementVal('email');
        var emergencyContactName = getElementVal('emergencyContactName');
        var emergencyContactPhone = getElementVal('emergencyContactPhone');
        var emergencyContactAddress = getElementVal('emergencyContactAddress');

        saveMessages(reason, affiliation, studentNumber, firstName, middleName, lastName, gender, dob, 
            college, cys, homeAddress, email, emergencyContactName, emergencyContactAddress, emergencyContactPhone);

        console.log(reason, affiliation, studentNumber, firstName, middleName, lastName, gender, dob, 
            college, cys, homeAddress, email, emergencyContactName, emergencyContactAddress, emergencyContactPhone);
    }

    const saveMessages = (reason, affiliation, studentNumber, firstName, middleName, lastName, gender, dob, 
        college, cys, homeAddress, email, emergencyContactName, emergencyContactAddress, emergencyContactPhone) => {
            var newIDForm = IDFormDB.push();

            newIDForm.set({
                reason : reason,
                affiliation : affiliation,
                studentNumber : studentNumber,
                firstName : firstName,
                middleName : middleName,
                lastName : lastName,
                gender : gender,
                bday : dob,
                college : college,
                course_year_section : cys,
                homeAddress : homeAddress,
                email : email,
                emergencyContactName : emergencyContactName,
                emergencyContactPhone : emergencyContactPhone,
                emergencyContactAddress : emergencyContactAddress
            
            });

    };
        
    const form = document.getElementById('applicationForm');
    const fieldsets = form.querySelectorAll('fieldset');
    const nextButtons = form.querySelectorAll('.nextButton');
    const prevButtons = form.querySelectorAll('.prevButton');
    const modal = document.getElementById('popup');
    const closeButton = document.querySelector('.close-button');
    let currentStep = 0;

    // Disable built-in form validation
    form.setAttribute('novalidate', true);

    // Functions for form navigation and validation
    function showStep(step) {
        fieldsets.forEach((fieldset, index) => {
            fieldset.style.display = (index === step) ? 'block' : 'none';
        });
    }

    function validateForm(step) {
        const currentFieldset = fieldsets[step];
        const inputs = currentFieldset.querySelectorAll('input, textarea, select');
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            if (input.hasAttribute('required') && input.value.trim() === '') {
                alert('Please fill out all required fields.');
                return false;
            }

            if (input.type === 'email' && !validateEmail(input.value.trim())) {
                alert('Please enter a valid email address.');
                return false;
            }

            if (input.type === 'tel' && !/^\d{11}$/.test(input.value.trim())) {
                alert('Please enter a valid phone number.');
                return false;
            }
        }
        return true;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function nextStep() {
        if (validateForm(currentStep)) {
            currentStep++;
            if (currentStep >= fieldsets.length) {
                currentStep = fieldsets.length - 1;
            }
            showStep(currentStep);
        }
    }

    function prevStep() {
        currentStep--;
        if (currentStep < 0) {
            currentStep = 0;
        }
        showStep(currentStep);
    }

    function showSuccessModal() {
        modal.style.display = 'block';
    }

    function hideSuccessModal() {
        modal.style.display = 'none';
    }

    // Event listeners for navigation buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            nextStep();
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            prevStep();
        });
    });

    closeButton.addEventListener('click', function() {
        hideSuccessModal();
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            hideSuccessModal();
        }
    });

    showStep(currentStep);
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(currentStep)) {
            showSuccessModal();
            form.reset();
            currentStep = 0;
            showStep(currentStep);
        }
    });  // Initialize form with the first step displayed
});