
const donorForm = document.getElementById("donorForm");
const donorMessage = document.getElementById("donorMessage");
const searchButton = document.getElementById("searchButton");
const donorResults = document.getElementById("donorResults");

// Demo records only. These are fictional names and locations.
const donors = [
    { name: "Aarav Demo", bloodGroup: "O+", city: "Pune" },
    { name: "Riya Demo", bloodGroup: "B+", city: "Mumbai" },
    { name: "Kabir Demo", bloodGroup: "A+", city: "Pune" },
    { name: "Anaya Demo", bloodGroup: "AB+", city: "Nashik" },
    { name: "Ishaan Demo", bloodGroup: "O-", city: "Pune" }
];

// Register a donor
donorForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const bloodGroup = document.getElementById("bloodGroup").value;
    const city = document.getElementById("city").value.trim();

    if (!name || !bloodGroup || !city) {
        donorMessage.textContent = "Please fill in all fields.";
        return;
    }

    donors.push({
        name: name,
        bloodGroup: bloodGroup,
        city: city
    });

    donorMessage.textContent =
        "Demo registration successful! Your record is added in this session.";

    donorForm.reset();
});

// Search donors by blood group and city
searchButton.addEventListener("click", function () {
    const selectedGroup = document.getElementById("searchGroup").value;
    const selectedCity = document.getElementById("searchCity")
        .value.trim().toLowerCase();

    const matchedDonors = donors.filter(function (donor) {
        const groupMatches =
            selectedGroup === "" || donor.bloodGroup === selectedGroup;

        const cityMatches =
            selectedCity === "" ||
            donor.city.toLowerCase() === selectedCity;

        return groupMatches && cityMatches;
    });

    donorResults.replaceChildren();

    if (matchedDonors.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No matching demo donors found.";
        donorResults.appendChild(message);
        return;
    }

    matchedDonors.forEach(function (donor) {
        const resultCard = document.createElement("div");
        resultCard.className = "donor-result";

        const donorName = document.createElement("h3");
        donorName.textContent = donor.name;

        const group = document.createElement("p");
        group.textContent = "Blood Group: " + donor.bloodGroup;

        const city = document.createElement("p");
        city.textContent = "City: " + donor.city;

        resultCard.append(donorName, group, city);
        donorResults.appendChild(resultCard);
    });
});
