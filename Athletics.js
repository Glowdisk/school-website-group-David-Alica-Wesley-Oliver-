const template = document.getElementById("sport-card-template");
        const container = document.getElementById("sports-container");

sportsData.forEach(sport => {
            const clone = template.content.cloneNode(true);
 
            const nameElem = clone.querySelector('.name');
            const coachElem = clone.querySelector('.coach'); 
            const hoursElem = clone.querySelector(".hours");
            const locationElem = clone.querySelector(".location");

            if (!sport.name || sport.name.trim() === ""){
                nameElem.textContent = "n/a";
            } else {
                nameElem.textContent = sport.name;
            }

            if (!sport.name || sport.coach.trim === "") {
                coachElem.textContent = "n/a";
            } else {
                coachElem.textContent = sport.coach;
            }
            
            if (!sport.hours || sport.hours.trim() === "" || sport.hours === undefined) {
                hoursElem.textContent = "n/a";
            } else {
                hoursElem.textContent = sport.hours;
            }

            if (!sport.location || sport.location.trim() === "") {
                locationElem.textContent = "n/a";
            } else {
                locationElem.textContent = sport.location;
            }

            let targetContainerId;
            if (sport.season === "fall") {
                targetContainerId = "fall-container";
            } else if (sport.season === "winter") {
                targetContainerId = "winter-container";
            } else if (sport.season === "spring") {
                targetContainerId = "spring-container";
            } else {
                targetContainerId = "n/a"
            }

            const container = document.getElementById(targetContainerId);
            if (container) {
                container.appendChild(clone);
            }
        });
