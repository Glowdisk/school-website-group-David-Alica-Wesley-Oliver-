const sportsData = [
    { name: "Cross-country", coach: "Daniel Hamiltion (djhamilton@seattleschools.org)", hours: "M,Tu,Th,F 4-6pm, W 2:45-4:45", location: "Track", season: "fall"},
    { name: "Wrestling", coach: "Mitchell Torres (mjtorres@seattleschools.org)",hours: "M,Tu,Th,F 4-6pm, W 2:45-4:45", location: "Cafeteria", season: "winter"},
    { name: "Track", coach: "Rickey Davis (rrdavis@seattleschools.org)", hours: "M,Tu,Th,F 4-6pm, W 2:45-4:45", location: "Track", season: "spring"},
    { name: "Football", coach: "Robert Richmonds (richmonds19@outlook.com)",hours: "M,Tu,Th,F 4-6pm, W 2:45-4:45", location: "Track", season: "fall"},
    { name: "Golf", coach: "Gary Tatterson (gtatterson@hiltoncabinets.com)", hours: "M,Tu,Th,F 4-6pm, W 2:45-4:45", location: "Jefferson Park Golf Course", season: "fall"},
    { name: "Girls Swim", coach : "Mark Nichols (mcnichols@seattleschools.org)", hours: "Everyday 6:30am-7:45am", location: "Rainer Beach Pool", season: "fall"},
    { name: "Boys Swim", coach : "Mark Nichols (mcnichols@seattleschools.org)", hours: "Everyday 6:30am-7:45am", location: "Rainer Beach Pool", season: "winter"},
    { name: "Vollyball", coach: "Lorna Considine (llconsidine@seattleschools.org)", hours: "JV/JVC 4-5:30, Varsity 5:30-7", location: "Gym", season: "fall"},
    { name: "Girls Basketball", coach: "Chakeitha Wigfall (chwigfall@seattleschools.org)", hours: "Everyday 4:30-6", location: "Gym", season: "winter" },
    { name: "Boys Basketball", coach: "Abdul Mohamad(abmohamad@seattleschools.org)", hours: "Everyday 4:30-6", location: "Gym", season: "winter"},
    { name: "Bowling", coach: "Rickey Davis (rrdavis@seattleschools.org)", season: "winter"},
    { name: "Girls Flag Football", coach: "Kevin Hernandez(kjhernandez@seattleschools.org)", location: "Field", season: "winter"},
    { name: "Tennis", coach: "Rodger Yamaguichi(rogersyamaguchi@hotmail.com)", hours: "M,Tu,Th,F 4-6pm, W 2:45-6", location: "Jefferson Park Tennis Courts", season: "spring"},
    { name: "Baseball", coach: "Gary Tatterson(gtatterson@hiltoncabinets.com)", location: "Field", season: "spring" },
    { name: "Boys Soccer", coach: "Adnan Omer(adnanomeradi@gmail.com)", location: "Field", season: "spring"},
    { name: "Girls-Frisbee", coach: "Zeppelin Raunig(zeppelin@allgirleverything.org)", hours: "Everyday 7-9", location: "Field", season: "spring"},
    { name: "Boys-Frisbee", coach: "Zeppelin Raunig(zeppelin@allgirleverything.org)", hours: "Everyday 7-9", location: "Field", season: "fall"},
    { name: "Fastpitch Softball", coach: "Kiana Camilon(kiana.rose.camilon@gmail.com)",location: "Field", season: "spring"},
    { name: "Slowpitch Softball", coach: "Kiana Camilon(kiana.rose.camilon@gmail.com)", location: "Field", season: "fall"}

];

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