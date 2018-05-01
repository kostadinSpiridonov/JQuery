//HTML elements
var accountTypeGroupS = '.account-type-group';
var teamSizeInputS = '#teamSize';

// Properties
accountTypes = {
    personal: 'Personal',
    organisation: 'Organisation'
}


$(document).ready(function () {
    subscribeToEvents();
})

function subscribeToEvents() {
    $(accountTypeGroupS).change(accountTypeChanged);
}

function accountTypeChanged(event) {
    var teamSizeInput = $(teamSizeInputS);
    if (event.target.defaultValue == accountTypes.organisation) {
        teamSizeInput.prop('disabled', false);
    }
    else {
        teamSizeInput.prop('disabled', true);
        removeError(teamSizeInput);
    }
}