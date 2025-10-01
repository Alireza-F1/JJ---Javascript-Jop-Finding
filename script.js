import './JS/Components/searchComponent.js';
import './JS/Components/JobDetailsComponent.js';
import {totalAvailableJobEl, Base_URL} from './JS/Elements.js';

fetch(Base_URL)
.then(res => {
    if(!res.ok){
        console.log("Server Doesn't Responded");
        return;
    }
    return res.json();
})
.then(data => {
    const totalJobs = data.jobItems.length;
    totalAvailableJobEl.textContent = totalJobs;
})

