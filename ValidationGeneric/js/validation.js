//HTML selectors
var form = 'form';
var formInputs = 'form input';
var formTextAreas = 'form textarea';
var formSelects = 'form select';
var formCheckS = '.form-check';
var passwordInputsSelector = 'input[type="password"]';

//Constants
var minPaswordLength = 6;

// Error messages
var passwordErrorMessage = "The password must be at least 6 characters";
var requiredErrorMessage = "Please enter a value"
var emailErrorMessage = "The entered email address is not valid";
var selectErrorMessage = "Please select a value";
var checkErrorMessage = "Please agree";
var confirmPasswordErrorMessage = "The passwords must be the same";

validationType = {
    text: 'text',
    checkbox: 'checkbox',
    email: 'email',
    password: 'password',
    textarea: 'textarea',
    selectone: 'select-one',
    selectmultiple: 'select-multiple'
}

$(document).ready(function () {
    $(form).on('submit', onSubmit);
    $(form).on('reset', removeAllErrors);
    $(formInputs).on("change paste keyup", onChange);
    $(formTextAreas).on("change paste keyup", onChange);
    $(formSelects).on("change paste keyup", onChange);
})

function onChange(event) {
    // Get validation element
    var target = event.target;

    // Validate the field by type
    validateField($(target), target.type);
}

function onSubmit(event) {
    event.preventDefault();
    return validateForm();
}

function validateForm() {
    var validationResult = true;

    // Validate all inputs in the form
    if (!validateControls(formInputs)) {
        validationResult = false;
    }

    // Validate all textareas in the form
    if (!validateControls(formTextAreas)) {
        validationResult = false;
    }

    // Validate all selects in the form
    if (!validateControls(formSelects)) {
        validationResult = false;
    }

    return validationResult;
}

function validateControls(selector) {
    var validationResult = true;

    // Get all elements by specified selector
    var elements = $(selector);
    for (var i = 0; i < elements.length; i++) {
        var element = $(elements[i]);
        var elementType = elements[i].type;

        // If the type is undefined or the element is disabled, do not validate
        if (!elementType || element.attr('disabled') == 'disabled') {
            continue;
        }

        // Validate the field
        var valid = validateField(element, elementType);
        if (!valid) {
            validationResult = false;
        }
    }

    return validationResult;
}

function validateField(element, validationTypeValue) {
    var validationResult;

    // Run value validation based on the type
    switch (validationTypeValue) {
        case validationType.text:
        case validationType.textarea:
            validationResult = required(element);
            break;
        case validationType.checkbox:
            validationResult = checked(element);
            break;
        case validationType.email:
            validationResult = required(element) && isEmail(element);
            break;
        case validationType.selectone:
        case validationType.selectmultiple:
            // Check if there is selected value
            validationResult = selected(element);
            break;
        case validationType.password: {
            validationResult = required(element) && password(element);

            // If the field value is valid and the type is password
            // get the second password field (confirmation field) and compare the passwords
            if (validationResult) {
                validationResult = runConfirmationPasswordComperator();
            }
            break;
        }
    }

    return validationResult;
}

function runConfirmationPasswordComperator() {
    var passwordInputs = $(passwordInputsSelector);
    var firstElement = $(passwordInputs[0]);
    var secondElement = $(passwordInputs[1]);

    if (firstElement.val()===secondElement.val()) {
        removeError(secondElement);
        return true;
    }

    showError(secondElement, confirmPasswordErrorMessage);
    return false;
}

function password(element) {
    var value = element.val();
    if (value.length >= minPaswordLength) {
        removeError(element);
        return true;
    }

    showError(element, passwordErrorMessage);
    return false;
}

function required(element) {
    var value = element.val();
    if (value != null && value != '') {
        removeError(element);
        return true;
    }

    showError(element, requiredErrorMessage);
    return false;
}

function checked(element) {
    if (element.is(':checked')) {
        removeError(element);
        return true;
    }

    showError(element, checkErrorMessage);
    return false;

}

function selected(element) {
    if (element.val().length > 0) {
        removeError(element);
        return true;
    }

    showError(element, selectErrorMessage);
    return false;

}

function isEmail(element) {
    var value = element.val();
    if ((/(.+)@(.+){2,}\.(.+){2,}/.test(value))) {
        removeError(element);
        return true;
    }

    showError(element, emailErrorMessage);
    return false;
}

function showError(element, message) {
    element.css('border-color', 'red')
    if (element.parent().children('.error').length == 0) {
        element.parent().append('<p class="error"> ' + message + ' </p>');
    }
}

function removeError(element) {
    element.css('border-color', '#ced4da');
    element.parent().children().remove('.error');
}

function removeAllErrors() {
    var inputs = $(formInputs);
    for (var i = 0; i < inputs.length; i++) {
        removeError($(inputs[i]));
    }
    
    var textAreas = $(formTextAreas);
    for (var i = 0; i < textAreas.length; i++) {
        removeError($(textAreas[i]));
    }
    
    var selects = $(formSelects);
    for (var i = 0; i < selects.length; i++) {
        removeError($(selects[i]));
    }
}