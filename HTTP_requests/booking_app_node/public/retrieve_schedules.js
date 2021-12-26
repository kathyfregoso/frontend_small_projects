/*
UNDERSTANDING THE PROBLEM
INPUT:
OUTPUT: 
RULES: 
 - function retrieves all the schedules that are available
  - if 1+ schedules available, tally count for each staff and alter user of result as
   "key: value" pairs with staff id as key (format 'staff {id} => 'staff 1')
   and count of schedules as value
  - if no schedules, alert user that there are no schedules available for booking
 - handle situation when 7 or more schedules to retrieve
  - if 5 seconds pass, cancel retrieval and inform user to try again
 - inform user about completion of request regardless of success or failure (timeout)

EXAMPLES/EDGE CASES: 

DATA STRUCTURE(S): 

ALGORITHM:
*/

function retrieveSchedules() {
  let request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/api/schedules");
  request.responseType = "json";
  request.timeout = 5000;

  request.addEventListener("load", (event) => {
    let schedules = request.response;
    let staff = [];
    let tally = [];

    if (schedules.length > 0) {
      schedules.forEach(({ staff_id }) => {
        let key = `staff ${staff_id}`;
        if (!staff.includes(key)) {
          staff.push(key);
          tally.push(1);
        } else {
          tally[staff.indexOf(key)] += 1;
        }
      });

      alert(tally.map((_, idx) => `${staff[idx]}: ${tally[idx]}`).join("\n"));
    } else {
      alert("There are no schedules available to book.");
    }
  });

  request.addEventListener("timeout", (event) => {
    alert("It is taking an unusually long time, try again please.");
  });

  request.addEventListener("loadend", (event) => {
    alert("Your request has completed");
  });

  request.send();
}

retrieveSchedules();
