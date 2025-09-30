let inputSearchTermEl = document.querySelector('.search_term');
let formEl = document.querySelector('.search_form');
let errorBoxEl = document.querySelector('.invalid_input_error');
let spinnerSearchEl = document.querySelector('.spinner--search');

const Base_URL = 'https://bytegrad.com/course-assets/js/2/api/jobs';

const submitHandler = (event) => {
    // Removing all the defaults
    event.preventDefault();

    // Get the input value
    const searchTermValue = inputSearchTermEl.value.toLowerCase();

    // Input Validation
    const forbiddenChars = /[0-9 | # | @ | ! | ~ | $ | % | / | ^ | *]/;
    if (forbiddenChars.test(searchTermValue)) {

        // Add input incorrect effect for 1.5s and then remove it
        // Effect on search box
        formEl.classList.add('search_form_incorrect');
        setTimeout(() => {formEl.classList.remove('search_form_incorrect')}, 1500);

        // Error box
        errorBoxEl.classList.add('invalid_input_error_visible');
        setTimeout(() => {errorBoxEl.classList.remove('invalid_input_error_visible')}, 1500);

        return;
    }

    // Revert the focus from search box
    inputSearchTermEl.blur();

    // Add input correct effect for 1.5s and then remove it
    formEl.classList.add('search_form_correct');
    setTimeout(() => {formEl.classList.remove('search_form_correct')}, 1500);
    
    // Add spinner for waiting until fetch
    spinnerSearchEl.classList.add('spinner--visible');

    // Fetching data from API 
}



formEl.addEventListener('submit', submitHandler);