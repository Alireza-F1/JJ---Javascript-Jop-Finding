import {inputSearchTermEl, formEl, errorBoxEl, spinnerSearchEl,
        resultNumberEl, jobItemsContainer, Base_URL, nextPageEl,
        nextPageNumberEl, fromToResultEl, previousPageNumberEl,
        previousPageEl} from '../Elements.js';

let pageNum=1;
let job_items = [];


const create_items = (job_items, pageNum=1) => {
    let from = (pageNum-1)*7;
    let to = pageNum*7;

    fromToResultEl.textContent = `items: ${from+1} to ${to}`;

    job_items.slice(from , to).forEach(item => {
            const single_job_item = `
                <a href="${item.id}" class="job_item">
                <div class="job_item_logo_container">
                    <p class="logo_word">
                        ${item.badgeLetters}
                    </p>
                </div>

                <div class="job_item_job_summarized_detail">
                    <div class="job_item_job_summarized_detail_line_1">
                        <p class="job_title">${item.title}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                        
                    <div class="job_item_job_summarized_detail_line_2">
                        <i class="company_name">${item.company}</i>
                        <span class="day_ago">${item.daysAgo}d</span>
                    </div>
                        
                    <div class="job_item_job_summarized_detail_line_3">
                        <p class="time">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
                            </svg>
                            ${item.duration}
                        </p>
                        <p class="salary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                                <path fill-rule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd" />
                            </svg>
                            ${item.salary}
                        </p>
                        <p class="location">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                            </svg>
                            ${item.location}
                        </p>
                    </div>
                </div>
            </a>
        <span class="job_result_header_end_line"></span>
            `;

            // Add each single item to the HTML code
            jobItemsContainer.insertAdjacentHTML('afterbegin', single_job_item);
        })
}

const submitHandler = (event) => {
    // Removing all the defaults
    if (pageNum==1){
        event.preventDefault();
    }
    
    // If users are in different pages, they should retrieve to the first place when thy submit
    // new query.
    pageNum = 1;
    nextPageNumberEl.textContent = 2;
    previousPageNumberEl.textContent = 0;

    // Remove all the element when user retype keywords
    let jobItemEl = document.querySelectorAll('.job_item');
    if (jobItemEl) {
      jobItemEl.forEach(el => el.remove());
    }

    // Get the input value
    const searchTermValue = inputSearchTermEl.value.toLowerCase();

    // Input Validation
    const forbiddenChars = /[0-9 | @ | ! | ~ | $ | % | / | ^ | *]/;
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
    fetch(Base_URL + `?search=${searchTermValue}`)
    .then(res => {
        if (!res.ok) {console.log('Server is not responding')}
        else {
            spinnerSearchEl.classList.remove('spinner--visible');
            return res.json();
        }
    })
    .then(data => {
        job_items = data.jobItems;
        resultNumberEl.textContent = job_items.length;

        // Creating items
        create_items(job_items, pageNum);
    })
}


const nextPageHandler = () => {
    if (Math.ceil(job_items.length/7) > pageNum){
        pageNum = Number(nextPageNumberEl.textContent);
        nextPageNumberEl.textContent = pageNum+1;
        previousPageNumberEl.textContent = pageNum-1;

        // Remove all the element when user retype keywords
        let jobItemEl = document.querySelectorAll('.job_item');
        if (jobItemEl) {
            jobItemEl.forEach(el => el.remove());
        }
        create_items(job_items, pageNum);
    }
}

const previousPageHandler = () => {
    if (1 < pageNum){
        pageNum = pageNum - 1;
        previousPageNumberEl.textContent = pageNum-1;
        nextPageNumberEl.textContent = pageNum+1;

        // Remove all the element when user retype keywords
        let jobItemEl = document.querySelectorAll('.job_item');
        if (jobItemEl) {
            jobItemEl.forEach(el => el.remove());
        }

        create_items(job_items, pageNum);
    }
}

formEl.addEventListener('submit', submitHandler);
nextPageEl.addEventListener('click', nextPageHandler);
previousPageEl.addEventListener('click', previousPageHandler);