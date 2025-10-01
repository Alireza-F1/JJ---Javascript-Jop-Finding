// Related to the search
export let inputSearchTermEl = document.querySelector('.search_term');
export let formEl = document.querySelector('.search_form');
export let errorBoxEl = document.querySelector('.invalid_input_error');
export let spinnerSearchEl = document.querySelector('.spinner--search');
export let resultNumberEl = document.querySelector('.number_of_results');
export let jobItemsContainer = document.querySelector('.job_result_main');

// Related to the Job Details
export let spinnerJobDetailsEl = document.querySelector('.spinner--job-details');
export let jobItemEl = document.querySelector('.job_result_main');
export let beforeUploadingJobDetailsEl = document.querySelector('.before_uploading');
export let afterUploadingJobDetailsEl = document.querySelector('.after_uploading');
export let totalAvailableJobEl = document.querySelector('.total_job_avialable_footer');



// The base API url
export const Base_URL = 'https://bytegrad.com/course-assets/js/2/api/jobs';