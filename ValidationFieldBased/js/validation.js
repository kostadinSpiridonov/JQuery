//HTML selectors
var form = 'form';
var resetS = '#reset';
var firstNameS = '#firstName';
var lastNameS = '#lastName';
var profileSummaryS = '#profileSummary';
var termsAgreeS = '#termsAgree';
var emailS = '#email';
var passwordS = '#password';
var confirmPasswordS = '#confirmPassword';
var genderS = '#gender';
var teamSizeS = '#teamSize';

// Error messages
var passwordErrorMessage = "The password must be at least 6 characters";
var requiredErrorMessage = "Please enter a value"
var emailErrorMessage = "The entered email address is not valid";
var selectErrorMessage = "Please select a value";
var checkErrorMessage = "Please agree";
var confirmPasswordErrorMessage = "The passwords must be the same";

//Constants
var minPaswordLength = 6;

$(document).ready(function () {
    registerEvents();
})

function registerEvents() {
    $(form).on('submit', onSubmit);
    $(resetS).on('click', removeAllErrors);

    $(firstNameS).on("change paste keyup", function () {
        validateRequired(firstNameS);
    });
    
    $(lastNameS).on("change paste keyup", function () {
        validateRequired(lastNameS);
    });

    $(profileSummaryS).on("change paste keyup", function () {
        validateRequired(profileSummaryS);
    });

    $(passwordS).on("change paste keyup", function () {
        var valid = validateRequired(passwordS);
        valid = validatePassword(passwordS) && valid;
        if (valid) {
            compareValues(passwordS, confirmPasswordS);
        }
    });

    $(confirmPasswordS).on("change paste keyup", function () {
        var valid = validateRequired(confirmPasswordS);
        valid = validatePassword(confirmPasswordS);
        if (valid) {
            compareValues(passwordS, confirmPasswordS);
        }
    });

    $(emailS).on("change paste keyup", function () {
        validateRequired(emailS);
        validateEmail(emailS);
    });

    $(termsAgree).on("change paste keyup", function () {
        validatecChecked(termsAgree);
    });

    $(genderS).on("change paste keyup", function () {
        validateSelected(genderS);
    })

    $(teamSizeS).on("change paste keyup", function () {
        validateSelected(teamSizeS);
    });
}

function onSubmit(event) {
    event.preventDefault();
    return validateForm();
}

function validateForm() {
    var valid = true;

    if (!validateRequired(firstNameS)) {
        valid = false;
    }

    if (!validateRequired(lastNameS)) {
        valid = false;
    }

    if (!validateRequired(profileSummaryS)) {
        valid = false;
    }

    if (!validatecChecked(termsAgreeS)) {
        valid = false;
    }

    if (!validateRequired(emailS)) {
        valid = false;
    }

    if (!validateEmail(emailS)) {
        valid = false;
    }

    var validPasswords = true;
    if (!validateRequired(passwordS)) {
        valid = false;
        validPasswords = false;
    }

    if (!validatePassword(passwordS)) {
        valid = false;
        validPasswords = false;
    }

    if (!validateRequired(confirmPasswordS)) {
        valid = false;
        validPasswords = false;
    }

    if (!validatePassword(confirmPasswordS)) {
        valid = false;
        validPasswords = false;
    }

    if (validPasswords) {
        valid = compareValues(passwordS, confirmPasswordS);;
    }

    if (!validateSelected(genderS)) {
        valid = false;
    }

    if (!validateSelected(teamSizeS)) {
        valid = false;
    }

    return valid;
}

function validateRequired(selector) {
    var element = $(selector);
    if (isDisabled(element)) {
        return true;
    }

    var elementValue = element.val();
    if (elementValue != null && elementValue != '') {
        removeError(element);
        return true;
    }

    showError(element, requiredErrorMessage);
    return false;
}

function validateEmail(selector) {
    var element = $(selector);
    if (isDisabled(element)) {
        return true;
    }

    if (isEmail(element.val())) {
        removeError(element);
        return true;
    }

    showError(element, emailErrorMessage);
    return false;
}

function validatePassword(selector) {
    var element = $(selector);
    if (isDisabled(element)) {
        return true;
    }

    var elementValue = element.val();
    if (elementValue.length >= minPaswordLength) {
        removeError(element);
        return true;
    }

    showError(element, passwordErrorMessage);
    return false;
}

function validateSelected(selector) {
    var element = $(selector);
    if (isDisabled(element)) {
        return true;
    }

    if (element.val().length > 0) {
        removeError(element);
        return true;
    }

    showError(element, selectErrorMessage);
    return false;
}

function validatecChecked(selector) {
    var element = $(selector);
    if (isDisabled(element)) {
        return true;
    }

    if (element.is(':checked')) {
        removeError(element);
        return true;
    }

    showError(element, checkErrorMessage);
    return false;
}

function compareValues(firstSelector, secondSelector) {
    var secondElement = $(secondSelector);
    var firstElementValue = $(firstSelector).val();
    var secondElementValue = secondElement.val();

    if (firstElementValue == secondElementValue) {
        removeError(secondElement);
        return true;
    }

    showError(secondElement, confirmPasswordErrorMessage);
}

function isDisabled(element) {
    return element.attr('disabled') == 'disabled';
}

function isEmail(value) {
    return /(.+)@(.+){2,}\.(.+){2,}/.test(value);
}

function showError(element, message) {
    element.css('border-color', 'red')
    if (element.parent().children('.error').length == 0) {
        element.after('<p class="error"> ' + message + ' </p>');
    }
}

function removeError(element) {
    element.css('border-color', '#ced4da');
    element.parent().children().remove('.error');
}

function removeAllErrors() {
    removeError($(firstNameS));
    removeError($(lastNameS));
    removeError($(profileSummaryS));
    removeError($(termsAgreeS));
    removeError($(emailS));
    removeError($(passwordS));
    removeError($(confirmPasswordS));
    removeError($(genderS));
    removeError($(teamSizeS));
}