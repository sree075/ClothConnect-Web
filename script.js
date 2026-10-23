// ============================================================
// CLOTHCONNECT - JSON SERVER VERSION
// COMPLETE SCRIPT
// HTML + CSS + JAVASCRIPT + JSON SERVER
// ============================================================

const API_URL = "http://localhost:3000";

// ============================================================
// JSON SERVER HELPERS
// ============================================================

async function getUsers() {
    try {
        const response = await fetch(`${API_URL}/users`);

        if (!response.ok) {
            throw new Error("Failed to load users");
        }

        return await response.json();

    } catch (error) {
        console.error("Users error:", error);
        return [];
    }
}


async function saveUser(user) {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error("Failed to save user");
        }

        return await response.json();

    } catch (error) {
        console.error("Save user error:", error);
        return null;
    }
}


async function getDonations() {
    try {
        const response = await fetch(`${API_URL}/donations`);

        if (!response.ok) {
            throw new Error("Failed to load donations");
        }

        return await response.json();

    } catch (error) {
        console.error("Donations error:", error);
        return [];
    }
}


async function saveDonation(donation) {
    try {
        const response = await fetch(`${API_URL}/donations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(donation)
        });

        if (!response.ok) {
            throw new Error("Failed to save donation");
        }

        return await response.json();

    } catch (error) {
        console.error("Save donation error:", error);
        return null;
    }
}


async function getRequests() {
    try {
        const response = await fetch(`${API_URL}/requests`);

        if (!response.ok) {
            throw new Error("Failed to load requests");
        }

        return await response.json();

    } catch (error) {
        console.error("Requests error:", error);
        return [];
    }
}


async function saveRequest(request) {
    try {
        const response = await fetch(`${API_URL}/requests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            throw new Error("Failed to save request");
        }

        return await response.json();

    } catch (error) {
        console.error("Save request error:", error);
        return null;
    }
}


// ============================================================
// LOGIN SESSION
// ============================================================

function getLoggedInUser() {

    try {

        const user =
            localStorage.getItem("loggedInUser");

        return user
            ? JSON.parse(user)
            : null;

    } catch (error) {

        console.error("Session error:", error);
        return null;
    }
}


// ============================================================
// REGISTER
// ============================================================

const registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const name =
                document
                    .getElementById("registerName")
                    ?.value
                    .trim();

            const email =
                document
                    .getElementById("registerEmail")
                    ?.value
                    .trim()
                    .toLowerCase();

            const phone =
                document
                    .getElementById("registerPhone")
                    ?.value
                    .trim();

            const userType =
                document
                    .getElementById("userType")
                    ?.value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById("registerPassword")
                    ?.value;

            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    ?.value;

            const locationField =
                document.getElementById(
                    "registerLocation"
                );

            const location =
                locationField
                    ? locationField.value.trim()
                    : "";


            if (
                !name ||
                !email ||
                !phone ||
                !userType ||
                !password ||
                !confirmPassword
            ) {

                alert(
                    "Please fill all the fields."
                );

                return;
            }


            if (
                userType !== "donor" &&
                userType !== "receiver"
            ) {

                alert(
                    "Please select Donor or Receiver."
                );

                return;
            }


            if (password.length < 6) {

                alert(
                    "Password must contain at least 6 characters."
                );

                return;
            }


            if (password !== confirmPassword) {

                alert(
                    "Passwords do not match!"
                );

                return;
            }


            const users =
                await getUsers();


            const existingUser =
                users.find(
                    user =>
                        String(
                            user.email || ""
                        )
                        .trim()
                        .toLowerCase()
                        === email
                );


            if (existingUser) {

                alert(
                    "This email is already registered.\nPlease login."
                );

                return;
            }


            const user = {

                id:
                    "USER" + Date.now(),

                name:
                    name,

                email:
                    email,

                phone:
                    phone,

                location:
                    location,

                userType:
                    userType,

                password:
                    password
            };


            const savedUser =
                await saveUser(user);


            if (!savedUser) {

                alert(
                    "Registration failed!\n\n" +
                    "Make sure JSON Server is running."
                );

                return;
            }


            localStorage.setItem(
                "clothConnectUser",
                JSON.stringify(savedUser)
            );


            alert(
                "Registration successful! 🎉"
            );


            window.location.href =
                "login.html";
        }
    );
}


// ============================================================
// LOGIN
// ============================================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const emailField =
                document.getElementById(
                    "loginEmail"
                );

            const passwordField =
                document.getElementById(
                    "loginPassword"
                );


            if (
                !emailField ||
                !passwordField
            ) {
                return;
            }


            const email =
                emailField.value
                    .trim()
                    .toLowerCase();

            const password =
                passwordField.value;


            const users =
                await getUsers();


            if (users.length === 0) {

                alert(
                    "No registered user found.\n\n" +
                    "Please register first."
                );

                return;
            }


            const user =
                users.find(
                    item =>

                        String(
                            item.email || ""
                        )
                        .trim()
                        .toLowerCase()
                        === email

                        &&

                        String(
                            item.password || ""
                        )
                        === password
                );


            if (!user) {

                alert(
                    "Invalid email or password."
                );

                return;
            }


            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(user)
            );


            localStorage.setItem(
                "clothConnectUser",
                JSON.stringify(user)
            );


            alert(
                "Login successful! 🎉"
            );


            const role =
                String(
                    user.userType || ""
                ).toLowerCase();


            if (role === "admin") {

                window.location.href =
                    "admin.html";

            } else if (role === "donor") {

                window.location.href =
                    "donor.html";

            } else {

                window.location.href =
                    "receiver.html";
            }

        }
    );
}


// ============================================================
// LOGOUT
// ============================================================

function logoutUser() {

    localStorage.removeItem(
        "loggedInUser"
    );

    localStorage.removeItem(
        "clothConnectUser"
    );

    window.location.href =
        "index.html";
}


// ============================================================
// PROFILE
// ============================================================

function loadProfile() {

    const user =
        getLoggedInUser();


    const profileName =
        document.getElementById(
            "profileName"
        );

    const profileEmail =
        document.getElementById(
            "profileEmail"
        );

    const profilePhone =
        document.getElementById(
            "profilePhone"
        );

    const profileLocation =
        document.getElementById(
            "profileLocation"
        );

    const profileRole =
        document.getElementById(
            "profileRole"
        );


    if (
        !profileName &&
        !profileEmail &&
        !profilePhone &&
        !profileLocation &&
        !profileRole
    ) {
        return;
    }


    if (!user) {

        window.location.href =
            "login.html";

        return;
    }


    if (profileName) {
        profileName.textContent =
            user.name || "";
    }


    if (profileEmail) {
        profileEmail.textContent =
            user.email || "";
    }


    if (profilePhone) {
        profilePhone.textContent =
            user.phone || "";
    }


    if (profileLocation) {
        profileLocation.textContent =
            user.location ||
            "Not provided";
    }


    if (profileRole) {
        profileRole.textContent =
            (
                user.userType ||
                "USER"
            ).toUpperCase();
    }
}


// ============================================================
// SHOW LOGGED-IN USER
// ============================================================

function showLoggedInUser() {

    const user =
        getLoggedInUser();


    if (!user) {
        return;
    }


    const ids = [

        "navProfileName",
        "receiverNavName",
        "requestUserName",
        "donationUserName",
        "clothesUserName",
        "navUserName"

    ];


    ids.forEach(id => {

        const element =
            document.getElementById(id);


        if (element) {

            element.textContent =
                user.name;
        }
    });
}


// ============================================================
// FORGOT PASSWORD
// ============================================================

async function forgotPassword() {

    const email =
        prompt(
            "Enter your registered email:"
        );


    if (!email) {
        return;
    }


    const users =
        await getUsers();


    const user =
        users.find(
            item =>

                String(
                    item.email || ""
                )
                .trim()
                .toLowerCase()

                ===

                email
                    .trim()
                    .toLowerCase()
        );


    if (!user) {

        alert(
            "Email address not found."
        );

        return;
    }


    alert(
        "Password reset information sent for " +
        user.email
    );
}


// ============================================================
// CONTACT
// ============================================================

function sendMessage(event) {

    event.preventDefault();


    alert(
        "Thank you! Your message has been submitted successfully."
    );


    const form =
        document.querySelector(
            ".contact-form"
        );


    if (form) {
        form.reset();
    }
}


// ============================================================
// DONOR DASHBOARD
// ============================================================

async function loadDonorDashboard() {

    const user =
        getLoggedInUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;
    }


    if (
        String(user.userType)
            .toLowerCase()
        !== "donor"
    ) {

        window.location.href =
            "receiver.html";

        return;
    }


    const donorName =
        document.getElementById(
            "donorName"
        );


    if (donorName) {
        donorName.textContent =
            user.name;
    }


    const donations =
        await getDonations();


    const myDonations =
        donations.filter(
            donation =>

                String(
                    donation.donorEmail ||
                    donation.email ||
                    ""
                )
                .trim()
                .toLowerCase()

                ===

                String(
                    user.email || ""
                )
                .trim()
                .toLowerCase()
        );


    const total =
        document.getElementById(
            "totalDonations"
        );

    const pending =
        document.getElementById(
            "pendingDonations"
        );

    const approved =
        document.getElementById(
            "approvedDonations"
        );

    const rejected =
        document.getElementById(
            "rejectedDonations"
        );

    const distributed =
        document.getElementById(
            "distributedDonations"
        );


    if (total) {
        total.textContent =
            myDonations.length;
    }


    if (pending) {
        pending.textContent =
            myDonations.filter(
                d =>
                    d.status === "Pending"
            ).length;
    }


    if (approved) {
        approved.textContent =
            myDonations.filter(
                d =>
                    d.status === "Approved"
            ).length;
    }


    if (rejected) {
        rejected.textContent =
            myDonations.filter(
                d =>
                    d.status === "Rejected"
            ).length;
    }


    if (distributed) {
        distributed.textContent =
            myDonations.filter(
                d =>
                    d.status === "Distributed"
            ).length;
    }


    const recent =
        document.getElementById(
            "recentDonations"
        );


    if (!recent) {
        return;
    }


    if (myDonations.length === 0) {

        recent.innerHTML = `
            <tr>
                <td colspan="4" class="empty-message">
                    No donations yet.
                </td>
            </tr>
        `;

        return;
    }


    recent.innerHTML = "";


    myDonations
        .slice()
        .reverse()
        .slice(0, 5)
        .forEach(donation => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${donation.item || ""}
                </td>

                <td>
                    ${donation.category || ""}
                </td>

                <td>
                    ${donation.date || ""}
                </td>

                <td>
                    ${donation.status || "Pending"}
                </td>

            `;


            recent.appendChild(row);
        });
}


// ============================================================
// RECEIVER DASHBOARD
// ============================================================

async function loadReceiverDashboard() {

    const user =
        getLoggedInUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;
    }


    if (
        String(user.userType)
            .toLowerCase()
        !== "receiver"
    ) {

        window.location.href =
            "donor.html";

        return;
    }


    const receiverName =
        document.getElementById(
            "receiverName"
        );


    if (receiverName) {
        receiverName.textContent =
            user.name;
    }


    const donations =
        await getDonations();


    const requests =
        await getRequests();


    const available =
        donations.filter(
            donation =>

                String(
                    donation.status || ""
                )
                .toLowerCase()

                ===

                "approved"
        );


    const myRequests =
        requests.filter(
            request =>

                String(
                    request.receiverEmail || ""
                )
                .trim()
                .toLowerCase()

                ===

                String(
                    user.email || ""
                )
                .trim()
                .toLowerCase()
        );


    const availableCount =
        document.getElementById(
            "availableCount"
        );

    const requestCount =
        document.getElementById(
            "requestCount"
        );

    const pendingCount =
        document.getElementById(
            "pendingRequestCount"
        );

    const approvedCount =
        document.getElementById(
            "approvedRequestCount"
        );

    const distributedCount =
        document.getElementById(
            "distributedRequestCount"
        );


    if (availableCount) {
        availableCount.textContent =
            available.length;
    }


    if (requestCount) {
        requestCount.textContent =
            myRequests.length;
    }


    if (pendingCount) {
        pendingCount.textContent =
            myRequests.filter(
                r =>
                    r.status === "Pending"
            ).length;
    }


    if (approvedCount) {
        approvedCount.textContent =
            myRequests.filter(
                r =>
                    r.status === "Approved"
            ).length;
    }


    if (distributedCount) {
        distributedCount.textContent =
            myRequests.filter(
                r =>
                    r.status === "Distributed"
            ).length;
    }


    const recentRequests =
        document.getElementById(
            "recentRequests"
        );


    if (!recentRequests) {
        return;
    }


    if (myRequests.length === 0) {

        recentRequests.innerHTML = `
            <tr>
                <td colspan="3" class="empty-message">
                    No requests yet.
                </td>
            </tr>
        `;

        return;
    }


    recentRequests.innerHTML = "";


    myRequests
        .slice()
        .reverse()
        .slice(0, 5)
        .forEach(request => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${request.item || ""}
                </td>

                <td>
                    ${request.date || ""}
                </td>

                <td>
                    ${request.status || "Pending"}
                </td>

            `;


            recentRequests.appendChild(row);
        });
}


// ============================================================
// DONATE PAGE
// ============================================================

function loadDonatePage() {

    const user =
        getLoggedInUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;
    }


    if (
        String(user.userType)
            .toLowerCase()
        !== "donor"
    ) {

        window.location.href =
            "receiver.html";
    }
}


// ============================================================
// IMAGE COMPRESSION
// ============================================================

function compressImage(file) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    const img =
                        new Image();


                    img.onload =
                        function () {

                            const maxSize =
                                700;


                            let width =
                                img.width;

                            let height =
                                img.height;


                            if (
                                width > maxSize ||
                                height > maxSize
                            ) {

                                if (
                                    width >= height
                                ) {

                                    height =
                                        Math.round(
                                            height *
                                            maxSize /
                                            width
                                        );

                                    width =
                                        maxSize;

                                } else {

                                    width =
                                        Math.round(
                                            width *
                                            maxSize /
                                            height
                                        );

                                    height =
                                        maxSize;
                                }
                            }


                            const canvas =
                                document.createElement(
                                    "canvas"
                                );


                            canvas.width =
                                width;

                            canvas.height =
                                height;


                            const context =
                                canvas.getContext(
                                    "2d"
                                );


                            context.drawImage(
                                img,
                                0,
                                0,
                                width,
                                height
                            );


                            const image =
                                canvas.toDataURL(
                                    "image/jpeg",
                                    0.7
                                );


                            resolve(image);
                        };


                    img.onerror =
                        function () {

                            reject(
                                new Error(
                                    "Image loading failed"
                                )
                            );
                        };


                    img.src =
                        event.target.result;
                };


            reader.onerror =
                function () {

                    reject(
                        new Error(
                            "File reading failed"
                        )
                    );
                };


            reader.readAsDataURL(file);
        }
    );
}


// ============================================================
// DONATION FORM
// ============================================================

const donationForm =
    document.getElementById(
        "donationForm"
    );


if (donationForm) {

    donationForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const user =
                getLoggedInUser();


            if (!user) {

                window.location.href =
                    "login.html";

                return;
            }


            const itemElement =
                document.getElementById(
                    "itemName"
                );

            const categoryElement =
                document.getElementById(
                    "category"
                );

            const genderElement =
                document.getElementById(
                    "gender"
                );

            const sizeElement =
                document.getElementById(
                    "size"
                );

            const conditionElement =
                document.getElementById(
                    "condition"
                );

            const quantityElement =
                document.getElementById(
                    "quantity"
                );

            const descriptionElement =
                document.getElementById(
                    "description"
                );

            const locationElement =
                document.getElementById(
                    "location"
                );

            const addressElement =
                document.getElementById(
                    "address"
                );

            const imageElement =
                document.getElementById(
                    "clothingImage"
                );


            if (
                !itemElement ||
                !categoryElement ||
                !genderElement ||
                !sizeElement ||
                !conditionElement ||
                !quantityElement ||
                !descriptionElement ||
                !locationElement ||
                !addressElement
            ) {

                alert(
                    "Donation form fields are missing."
                );

                return;
            }


            const item =
                itemElement.value.trim();

            const category =
                categoryElement.value;

            const gender =
                genderElement.value;

            const size =
                sizeElement.value;

            const condition =
                conditionElement.value;

            const quantity =
                quantityElement.value;

            const description =
                descriptionElement.value.trim();

            const location =
                locationElement.value.trim();

            const address =
                addressElement.value.trim();


            if (
                !item ||
                !category ||
                !gender ||
                !size ||
                !condition ||
                !quantity ||
                !description ||
                !location ||
                !address
            ) {

                alert(
                    "Please fill all donation details."
                );

                return;
            }


            let image = "";


            if (
                imageElement &&
                imageElement.files &&
                imageElement.files.length > 0
            ) {

                const file =
                    imageElement.files[0];


                if (
                    !file.type.startsWith(
                        "image/"
                    )
                ) {

                    alert(
                        "Please select a valid image."
                    );

                    return;
                }


                if (
                    file.size >
                    5 * 1024 * 1024
                ) {

                    alert(
                        "Please choose an image smaller than 5 MB."
                    );

                    return;
                }


                try {

                    image =
                        await compressImage(
                            file
                        );

                } catch (error) {

                    console.error(error);

                    alert(
                        "Unable to process the image."
                    );

                    return;
                }
            }


            const donation = {

                id:
                    "DON" + Date.now(),

                donorEmail:
                    user.email,

                donorName:
                    user.name,

                item:
                    item,

                category:
                    category,

                gender:
                    gender,

                size:
                    size,

                condition:
                    condition,

                quantity:
                    quantity,

                description:
                    description,

                location:
                    location,

                address:
                    address,

                image:
                    image,

                date:
                    new Date()
                        .toLocaleDateString(),

                status:
                    "Pending"
            };


            const savedDonation =
                await saveDonation(
                    donation
                );


            if (!savedDonation) {

                alert(
                    "Donation failed!\n\n" +
                    "Please make sure JSON Server is running."
                );

                return;
            }


            alert(
                "Donation submitted successfully! 🎉\n\n" +
                "Donation ID: " +
                savedDonation.id +
                "\nStatus: Pending"
            );


            window.location.href =
                "donor.html";
        }
    );
}


// ============================================================
// AVAILABLE CLOTHES
// ============================================================

let allClothes = [];


async function loadClothesPage() {

    const grid =
        document.getElementById(
            "clothesGrid"
        );

    const noClothes =
        document.getElementById(
            "noClothes"
        );

    const count =
        document.getElementById(
            "clothesCount"
        );


    if (!grid) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/donations`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to fetch donations"
            );
        }


        const donations =
            await response.json();


        const approvedClothes =
            donations.filter(
                donation =>
                    String(
                        donation.status || ""
                    ).toLowerCase()
                    === "approved"
            );


        allClothes =
            approvedClothes;


        displayClothes(
            approvedClothes
        );


    } catch (error) {

        console.error(
            "Clothes loading error:",
            error
        );


        grid.innerHTML = `

            <div class="no-clothes">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h2>
                    Unable to Load Clothes
                </h2>

                <p>
                    Please make sure JSON Server is running.
                </p>

            </div>

        `;


        if (count) {
            count.textContent = "0";
        }


        if (noClothes) {
            noClothes.style.display =
                "none";
        }
    }
}


// ============================================================
// DISPLAY CLOTHES
// ============================================================

function displayClothes(clothes) {

    const grid =
        document.getElementById(
            "clothesGrid"
        );

    const noClothes =
        document.getElementById(
            "noClothes"
        );

    const count =
        document.getElementById(
            "clothesCount"
        );


    if (!grid) {
        return;
    }


    if (count) {
        count.textContent =
            clothes.length;
    }


    if (clothes.length === 0) {

        grid.innerHTML = "";


        if (noClothes) {
            noClothes.style.display =
                "block";
        }


        return;
    }


    if (noClothes) {
        noClothes.style.display =
            "none";
    }


    grid.innerHTML =
        clothes
            .map(
                cloth => {

                    const imageHTML =
                        cloth.image

                            ? `

                                <img
                                    src="${cloth.image}"
                                    alt="${cloth.item || "Clothing"}"
                                    style="
                                        width:100%;
                                        height:230px;
                                        object-fit:cover;
                                        display:block;
                                    "
                                >

                              `

                            : `

                                <div style="
                                    width:100%;
                                    height:230px;
                                    display:flex;
                                    align-items:center;
                                    justify-content:center;
                                    background:#f1e3d5;
                                    font-size:60px;
                                ">
                                    👕
                                </div>

                              `;


                    return `

                        <div class="clothing-card">

                            ${imageHTML}

                            <div style="padding:20px;">

                                <h3 style="
                                    color:#4e321f;
                                    margin-bottom:10px;
                                ">
                                    ${cloth.item || ""}
                                </h3>

                                <p>
                                    <strong>Category:</strong>
                                    ${cloth.category || ""}
                                </p>

                                <p>
                                    <strong>Gender:</strong>
                                    ${cloth.gender || ""}
                                </p>

                                <p>
                                    <strong>Size:</strong>
                                    ${cloth.size || ""}
                                </p>

                                <p>
                                    <strong>Condition:</strong>
                                    ${cloth.condition || ""}
                                </p>

                                <p>
                                    <strong>Quantity:</strong>
                                    ${cloth.quantity || ""}
                                </p>

                                <button
                                    class="primary-btn"
                                    onclick="requestClothing('${cloth.id}')"
                                    style="
                                        margin-top:15px;
                                        width:100%;
                                    "
                                >
                                    Request This Cloth
                                </button>

                            </div>

                        </div>

                    `;
                }
            )
            .join("");
}


// ============================================================
// FILTER CLOTHES
// ============================================================

function filterClothes() {

    const searchElement =
        document.getElementById(
            "clothesSearch"
        );

    const categoryElement =
        document.getElementById(
            "categoryFilter"
        );

    const genderElement =
        document.getElementById(
            "genderFilter"
        );


    const search =
        searchElement
            ? searchElement.value
                .toLowerCase()
                .trim()
            : "";


    const category =
        categoryElement
            ? categoryElement.value
            : "all";


    const gender =
        genderElement
            ? genderElement.value
            : "all";


    const filtered =
        allClothes.filter(
            item => {

                const itemName =
                    String(
                        item.item || ""
                    )
                    .toLowerCase();


                return (

                    itemName.includes(
                        search
                    )

                    &&

                    (
                        category === "all"
                        ||
                        item.category ===
                        category
                    )

                    &&

                    (
                        gender === "all"
                        ||
                        item.gender ===
                        gender
                    )

                );
            }
        );


    displayClothes(
        filtered
    );
}


function clearClothesFilters() {

    const searchElement =
        document.getElementById(
            "clothesSearch"
        );

    const categoryElement =
        document.getElementById(
            "categoryFilter"
        );

    const genderElement =
        document.getElementById(
            "genderFilter"
        );


    if (searchElement) {
        searchElement.value = "";
    }


    if (categoryElement) {
        categoryElement.value =
            "all";
    }


    if (genderElement) {
        genderElement.value =
            "all";
    }


    displayClothes(
        allClothes
    );
}


// ============================================================
// REQUEST CLOTHING
// ============================================================

async function requestClothing(
    clothingId
) {

    const user =
        getLoggedInUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;
    }


    if (
        String(user.userType)
            .toLowerCase()
        !== "receiver"
    ) {

        alert(
            "Only receivers can request clothing."
        );

        return;
    }


    const donations =
        await getDonations();


    const clothing =
        donations.find(
            item =>
                String(item.id)
                ===
                String(clothingId)
        );


    if (!clothing) {

        alert(
            "Clothing item not found."
        );

        return;
    }


    const requests =
        await getRequests();


    const alreadyRequested =
        requests.some(
            request =>

                String(
                    request.clothingId
                )
                ===
                String(clothingId)

                &&

                String(
                    request.receiverEmail || ""
                )
                .trim()
                .toLowerCase()

                ===

                String(
                    user.email || ""
                )
                .trim()
                .toLowerCase()
        );


    if (alreadyRequested) {

        alert(
            "You have already requested this clothing."
        );

        return;
    }


    const request = {

        id:
            "REQ" + Date.now(),

        clothingId:
            clothing.id,

        item:
            clothing.item,

        category:
            clothing.category,

        receiverName:
            user.name,

        receiverEmail:
            user.email,

        donorName:
            clothing.donorName ||
            "Donor",

        donorEmail:
            clothing.donorEmail,

        date:
            new Date()
                .toLocaleDateString(),

        status:
            "Pending"
    };


    const savedRequest =
        await saveRequest(
            request
        );


    if (!savedRequest) {

        alert(
            "Request failed!\n\n" +
            "Please make sure JSON Server is running."
        );

        return;
    }


    // ========================================================
    // DONOR NOTIFICATION
    // ========================================================

    try {

        const notification = {

            id:
                "NOTIF" +
                Date.now(),

            donorEmail:
                clothing.donorEmail,

            donorName:
                clothing.donorName ||
                "Donor",

            receiverName:
                user.name ||
                "Receiver",

            receiverEmail:
                user.email,

            clothingId:
                clothing.id,

            item:
                clothing.item,

            requestId:
                savedRequest.id,

            type:
                "new-request",

            status:
                "Pending",

            message:
                user.name +
                " requested your clothing item: " +
                clothing.item,

            date:
                new Date()
                    .toLocaleString(),

            read:
                false
        };


        const notificationResponse =
            await fetch(
                `${API_URL}/notifications`,
                {

                    method:
                        "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            notification
                        )
                }
            );


        if (!notificationResponse.ok) {

            console.error(
                "Donor notification could not be saved."
            );
        }


    } catch (error) {

        console.error(
            "Notification error:",
            error
        );
    }


    alert(
        "Clothing request submitted successfully! 🎉\n\n" +
        "The donor has been notified."
    );


    window.location.href =
        "my-requests.html";
}


// ============================================================
// MY REQUESTS
// ============================================================

let myRequestsData = [];


async function loadMyRequestsPage() {

    const user =
        getLoggedInUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;
    }


    const requests =
        await getRequests();


    myRequestsData =
        requests.filter(
            request =>

                String(
                    request.receiverEmail || ""
                )
                .trim()
                .toLowerCase()

                ===

                String(
                    user.email || ""
                )
                .trim()
                .toLowerCase()
        );


    updateRequestStats();


    await displayMyRequests(
        myRequestsData
    );
}


// ============================================================
// REQUEST STATS
// ============================================================

function updateRequestStats() {

    const total =
        myRequestsData.length;


    const pending =
        myRequestsData.filter(
            r =>
                r.status ===
                "Pending"
        ).length;


    const approved =
        myRequestsData.filter(
            r =>
                r.status ===
                "Approved"
        ).length;


    const rejected =
        myRequestsData.filter(
            r =>
                r.status ===
                "Rejected"
        ).length;


    const distributed =
        myRequestsData.filter(
            r =>
                r.status ===
                "Distributed"
        ).length;


    const totalElement =
        document.getElementById(
            "totalRequests"
        );

    const pendingElement =
        document.getElementById(
            "pendingRequests"
        );

    const approvedElement =
        document.getElementById(
            "approvedRequests"
        );

    const rejectedElement =
        document.getElementById(
            "rejectedRequests"
        );

    const distributedElement =
        document.getElementById(
            "distributedRequests"
        );


    if (totalElement) {
        totalElement.textContent =
            total;
    }


    if (pendingElement) {
        pendingElement.textContent =
            pending;
    }


    if (approvedElement) {
        approvedElement.textContent =
            approved;
    }


    if (rejectedElement) {
        rejectedElement.textContent =
            rejected;
    }


    if (distributedElement) {
        distributedElement.textContent =
            distributed;
    }
}


// ============================================================
// DISPLAY MY REQUESTS
// ============================================================

async function displayMyRequests(
    requests
) {

    const list =
        document.getElementById(
            "requestsList"
        );

    const empty =
        document.getElementById(
            "noRequests"
        );


    if (!list) {
        return;
    }


    list.innerHTML = "";


    if (requests.length === 0) {

        if (empty) {
            empty.style.display =
                "block";
        }

        return;
    }


    if (empty) {
        empty.style.display =
            "none";
    }


    const users =
        await getUsers();


    requests
        .slice()
        .reverse()
        .forEach(
            request => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "request-card";


                let statusClass =
                    "status-pending";


                if (
                    request.status ===
                    "Approved"
                ) {

                    statusClass =
                        "status-approved";

                } else if (
                    request.status ===
                    "Rejected"
                ) {

                    statusClass =
                        "status-rejected";

                } else if (
                    request.status ===
                    "Distributed"
                ) {

                    statusClass =
                        "status-distributed";
                }


                const donor =
                    users.find(
                        user =>

                            String(
                                user.email || ""
                            )
                            .trim()
                            .toLowerCase()

                            ===

                            String(
                                request.donorEmail || ""
                            )
                            .trim()
                            .toLowerCase()
                    );


                const donorName =
                    request.donorName ||
                    donor?.name ||
                    "Donor";


                const donorPhone =
                    donor?.phone ||
                    "Not provided";


                const donorLocation =
                    donor?.location ||
                    "Not provided";


                let processHTML =
                    "";


                // ==================================================
                // APPROVED
                // ==================================================

                if (
                    request.status ===
                    "Approved"
                ) {

                    processHTML = `

                        <div style="
                            margin-top:20px;
                            padding:18px;
                            background:#f5efe9;
                            border-radius:14px;
                            border:1px solid #e6d5c6;
                        ">

                            <h3 style="
                                margin:0 0 12px;
                                color:#4e321f;
                            ">
                                ✅ Request Approved
                            </h3>

                            <p style="
                                margin-bottom:15px;
                            ">
                                Your clothing request has been approved by the donor.
                            </p>

                            <div style="
                                display:flex;
                                flex-direction:column;
                                gap:8px;
                            ">

                                <div>
                                    👤
                                    <strong>Donor:</strong>
                                    ${donorName}
                                </div>

                                <div>
                                    📞
                                    <strong>Phone:</strong>
                                    ${donorPhone}
                                </div>

                                <div>
                                    📍
                                    <strong>Location:</strong>
                                    ${donorLocation}
                                </div>

                            </div>

                            <p style="
                                margin-top:15px;
                                font-weight:600;
                                color:#6b4a32;
                            ">
                                📦 Please contact the donor and collect your clothing.
                            </p>

                        </div>

                    `;

                }


                // ==================================================
                // DISTRIBUTED
                // ==================================================

                else if (
                    request.status ===
                    "Distributed"
                ) {

                    processHTML = `

                        <div style="
                            margin-top:20px;
                            padding:18px;
                            background:#eef8f0;
                            border-radius:14px;
                            border:1px solid #cce8d1;
                        ">

                            <h3 style="
                                margin:0 0 10px;
                                color:#2f6b3b;
                            ">
                                🎉 Clothing Distributed
                            </h3>

                            <p style="
                                margin:0;
                                color:#3f5f46;
                            ">
                                The donor has handed over the clothing successfully.
                            </p>

                        </div>

                    `;

                }


                // ==================================================
                // REJECTED
                // ==================================================

                else if (
                    request.status ===
                    "Rejected"
                ) {

                    processHTML = `

                        <div style="
                            margin-top:20px;
                            padding:18px;
                            background:#fff1f1;
                            border-radius:14px;
                            border:1px solid #f0caca;
                        ">

                            <h3 style="
                                margin:0 0 10px;
                                color:#a33a3a;
                            ">
                                ❌ Request Rejected
                            </h3>

                            <p style="
                                margin:0;
                            ">
                                Unfortunately, the donor rejected this clothing request.
                            </p>

                        </div>

                    `;

                }


                // ==================================================
                // PENDING
                // ==================================================

                else {

                    processHTML = `

                        <div style="
                            margin-top:20px;
                            padding:18px;
                            background:#fff8e8;
                            border-radius:14px;
                            border:1px solid #f0dfb5;
                        ">

                            <h3 style="
                                margin:0 0 10px;
                                color:#8a641e;
                            ">
                                ⏳ Waiting for Approval
                            </h3>

                            <p style="
                                margin:0;
                            ">
                                The donor has not responded to your request yet.
                            </p>

                        </div>

                    `;
                }


                card.innerHTML = `

                    <div class="request-card-top">

                        <div>

                            <div class="request-item-name">
                                👕 ${request.item || ""}
                            </div>

                            <div class="request-id">
                                Request ID:
                                ${request.id || ""}
                            </div>

                        </div>


                        <span
                            class="request-status ${statusClass}"
                        >
                            ${request.status || "Pending"}
                        </span>

                    </div>


                    <div class="request-info">

                        <span>
                            Category:
                            ${request.category || ""}
                        </span>

                        <span>
                            Date:
                            ${request.date || ""}
                        </span>

                    </div>


                    ${processHTML}

                `;


                list.appendChild(
                    card
                );
            }
        );
}


// ============================================================
// FILTER MY REQUESTS
// ============================================================

function filterMyRequests() {

    const statusElement =
        document.getElementById(
            "requestStatus"
        );


    if (!statusElement) {
        return;
    }


    const selectedStatus =
        statusElement.value;


    if (
        selectedStatus ===
        "all"
    ) {

        displayMyRequests(
            myRequestsData
        );

        return;
    }


    const filtered =
        myRequestsData.filter(
            request =>
                request.status ===
                selectedStatus
        );


    displayMyRequests(
        filtered
    );
}


// ============================================================
// MY DONATIONS
// ============================================================

let myDonationsData = [];


async function loadMyDonationsPage() {

    const user =
        getLoggedInUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;
    }


    const donations =
        await getDonations();


    myDonationsData =
        donations.filter(
            donation =>

                String(
                    donation.donorEmail ||
                    donation.email ||
                    ""
                )
                .trim()
                .toLowerCase()

                ===

                String(
                    user.email || ""
                )
                .trim()
                .toLowerCase()
        );


    updateDonationStats();


    displayMyDonations(
        myDonationsData
    );
}


// ============================================================
// DONATION STATS
// ============================================================

function updateDonationStats() {

    const total =
        myDonationsData.length;


    const pending =
        myDonationsData.filter(
            d =>
                d.status ===
                "Pending"
        ).length;


    const approved =
        myDonationsData.filter(
            d =>
                d.status ===
                "Approved"
        ).length;


    const rejected =
        myDonationsData.filter(
            d =>
                d.status ===
                "Rejected"
        ).length;


    const distributed =
        myDonationsData.filter(
            d =>
                d.status ===
                "Distributed"
        ).length;


    const totalElement =
        document.getElementById(
            "totalDonations"
        );

    const pendingElement =
        document.getElementById(
            "pendingDonations"
        );

    const approvedElement =
        document.getElementById(
            "approvedDonations"
        );

    const rejectedElement =
        document.getElementById(
            "rejectedDonations"
        );

    const distributedElement =
        document.getElementById(
            "distributedDonations"
        );


    if (totalElement) {
        totalElement.textContent =
            total;
    }


    if (pendingElement) {
        pendingElement.textContent =
            pending;
    }


    if (approvedElement) {
        approvedElement.textContent =
            approved;
    }


    if (rejectedElement) {
        rejectedElement.textContent =
            rejected;
    }


    if (distributedElement) {
        distributedElement.textContent =
            distributed;
    }
}


// ============================================================
// DISPLAY MY DONATIONS
// ============================================================

function displayMyDonations(
    donations
) {

    const list =
        document.getElementById(
            "donationsList"
        );

    const empty =
        document.getElementById(
            "noDonations"
        );


    if (!list) {
        return;
    }


    list.innerHTML = "";


    if (donations.length === 0) {

        if (empty) {
            empty.style.display =
                "block";
        }

        return;
    }


    if (empty) {
        empty.style.display =
            "none";
    }


    donations
        .slice()
        .reverse()
        .forEach(
            donation => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "donation-card";


                let statusClass =
                    "donation-pending";


                if (
                    donation.status ===
                    "Approved"
                ) {

                    statusClass =
                        "donation-approved";

                } else if (
                    donation.status ===
                    "Rejected"
                ) {

                    statusClass =
                        "donation-rejected";

                } else if (
                    donation.status ===
                    "Distributed"
                ) {

                    statusClass =
                        "donation-approved";
                }


                const imageHTML =
                    donation.image

                        ? `

                            <img
                                src="${donation.image}"
                                alt="${donation.item || "Clothing"}"
                                style="
                                    width:120px;
                                    height:120px;
                                    object-fit:cover;
                                    border-radius:10px;
                                    margin-bottom:10px;
                                "
                            >

                          `

                        : "";


                card.innerHTML = `

                    ${imageHTML}

                    <div class="donation-card-top">

                        <div>

                            <div class="donation-item-name">
                                👕 ${donation.item || ""}
                            </div>

                            <div class="donation-id">
                                Donation ID:
                                ${donation.id || ""}
                            </div>

                        </div>


                        <span
                            class="donation-status ${statusClass}"
                        >
                            ${donation.status || "Pending"}
                        </span>

                    </div>


                    <div class="donation-info">

                        <span>
                            Category:
                            ${donation.category || ""}
                        </span>

                        <span>
                            For:
                            ${donation.gender || ""}
                        </span>

                        <span>
                            Size:
                            ${donation.size || ""}
                        </span>

                        <span>
                            Condition:
                            ${donation.condition || ""}
                        </span>

                        <span>
                            Quantity:
                            ${donation.quantity || ""}
                        </span>

                    </div>


                    <p class="donation-description">
                        ${donation.description || ""}
                    </p>


                    <div class="donation-date">
                        📅 Donated on:
                        ${donation.date || ""}
                    </div>
                    <button
    class="delete-donation-btn"
    onclick="deleteDonation('${donation.id}')">
    🗑️ Delete Donation
</button>

                `;


                list.appendChild(
                    card
                );
            }
        );
}


// ============================================================
// FILTER MY DONATIONS
// ============================================================

function filterMyDonations() {

    const statusElement =
        document.getElementById(
            "donationStatus"
        );


    if (!statusElement) {
        return;
    }


    const selectedStatus =
        statusElement.value;


    if (
        selectedStatus ===
        "all"
    ) {

        displayMyDonations(
            myDonationsData
        );

        return;
    }


    const filtered =
        myDonationsData.filter(
            donation =>
                donation.status ===
                selectedStatus
        );


    displayMyDonations(
        filtered
    );
}


// ============================================================
// VIEW CLOTHING
// ============================================================

function viewClothing(
    clothingName
) {

    const user =
        getLoggedInUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;
    }


    localStorage.setItem(
        "selectedClothing",
        clothingName
    );


    window.location.href =
        "clothing-details.html";
}


// ============================================================
// ADMIN PANEL
// ============================================================

async function loadAdminDonations() {

    const container =
        document.getElementById(
            "adminDonations"
        );


    if (!container) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/donations`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load donations"
            );
        }


        const donations =
            await response.json();


        const pendingDonations =
            donations.filter(
                donation =>
                    donation.status ===
                    "Pending"
            );


        if (
            pendingDonations.length ===
            0
        ) {

            container.innerHTML = `

                <div class="empty-message">

                    <h3>
                        No Pending Donations
                    </h3>

                    <p>
                        All donations have been processed.
                    </p>

                </div>

            `;

            return;
        }


        container.innerHTML =
            pendingDonations
                .map(
                    donation => `

                        <div class="admin-donation-card">

                            <div class="admin-image">

                                ${
                                    donation.image

                                    ? `

                                        <img
                                            src="${donation.image}"
                                            alt="Clothing Image"
                                        >

                                      `

                                    : `

                                        <div class="no-image">
                                            No Image
                                        </div>

                                      `
                                }

                            </div>


                            <div class="admin-details">

                                <h3>
                                    ${donation.item || ""}
                                </h3>

                                <p>
                                    <strong>Category:</strong>
                                    ${donation.category || ""}
                                </p>

                                <p>
                                    <strong>Gender:</strong>
                                    ${donation.gender || ""}
                                </p>

                                <p>
                                    <strong>Size:</strong>
                                    ${donation.size || ""}
                                </p>

                                <p>
                                    <strong>Condition:</strong>
                                    ${donation.condition || ""}
                                </p>

                                <p>
                                    <strong>Quantity:</strong>
                                    ${donation.quantity || ""}
                                </p>

                                <p>
                                    <strong>Donor:</strong>
                                    ${donation.donorName || ""}
                                </p>

                                <p>
                                    <strong>Location:</strong>
                                    ${donation.location || ""}
                                </p>

                                <p>
                                    <strong>Address:</strong>
                                    ${donation.address || ""}
                                </p>

                                <p>
                                    <strong>Status:</strong>

                                    <span class="pending-status">
                                        ${donation.status}
                                    </span>
                                </p>


                                <div class="admin-buttons">

                                    <button
                                        class="approve-btn"
                                        onclick="updateDonationStatus('${donation.id}', 'Approved')"
                                    >
                                        Approve
                                    </button>


                                    <button
                                        class="reject-btn"
                                        onclick="updateDonationStatus('${donation.id}', 'Rejected')"
                                    >
                                        Reject
                                    </button>

                                </div>

                            </div>

                        </div>

                    `
                )
                .join("");


    } catch (error) {

        console.error(
            "Admin donation error:",
            error
        );


        container.innerHTML = `

            <p class="error-message">
                Unable to load donations.
                Make sure JSON Server is running.
            </p>

        `;
    }
}


// ============================================================
// UPDATE DONATION STATUS
// ============================================================

async function updateDonationStatus(
    id,
    status
) {

    try {

        const response =
            await fetch(
                `${API_URL}/donations/${id}`,
                {

                    method:
                        "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            status:
                                status
                        })

                }
            );


        if (!response.ok) {

            throw new Error(
                "Status update failed"
            );
        }


        alert(
            `Donation ${status}!`
        );


        await loadAdminDonations();


    } catch (error) {

        console.error(
            "Donation status error:",
            error
        );


        alert(
            "Something went wrong while updating donation."
        );
    }
}


// ============================================================
// DONOR NOTIFICATIONS
// ============================================================

async function loadDonorNotifications() {

    const notificationList =
        document.getElementById(
            "notificationsList"
        );

    const notificationCount =
        document.getElementById(
            "notificationCount"
        );


    if (!notificationList) {
        return;
    }


    const user =
        getLoggedInUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;
    }


    if (
        String(user.userType)
            .toLowerCase()
        !== "donor"
    ) {

        window.location.href =
            "receiver.html";

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/notifications`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load notifications"
            );
        }


        const notifications =
            await response.json();


        const myNotifications =
            notifications.filter(
                notification =>

                    String(
                        notification.donorEmail || ""
                    )
                    .trim()
                    .toLowerCase()

                    ===

                    String(
                        user.email || ""
                    )
                    .trim()
                    .toLowerCase()

                    &&

                    notification.type !==
                    "request-status"

                    &&

                    notification.type !==
                    "distribution-status"
            );


        if (notificationCount) {

            notificationCount.textContent =
                myNotifications.filter(
                    notification =>
                        notification.read !== true
                ).length;
        }


        if (
            myNotifications.length ===
            0
        ) {

            notificationList.innerHTML = `

                <div class="empty-notifications">

                    <div class="empty-icon">
                        🔔
                    </div>

                    <h2>
                        No Notifications
                    </h2>

                    <p>
                        You don't have any new clothing requests.
                    </p>

                </div>

            `;

            return;
        }


        notificationList.innerHTML =
            "";


        myNotifications
            .slice()
            .reverse()
            .forEach(
                notification => {

                    const card =
                        document.createElement(
                            "div"
                        );


                    card.className =
                        "notification-card";


                    let actionHTML =
                        "";


                    // ==================================================
                    // DISTRIBUTED
                    // ==================================================

                    if (
                        notification.status ===
                        "Distributed"
                    ) {

                        actionHTML = `

                            <div class="notification-status-approved">
                                ✅ Clothing Distributed Successfully
                            </div>

                        `;

                    }


                    // ==================================================
                    // APPROVED
                    // ==================================================

                    else if (
                        notification.status ===
                        "Approved"
                    ) {

                        actionHTML = `

                            <div class="notification-status-approved">
                                ✅ Request Approved
                            </div>

                            <div class="notification-actions">

                                <button
                                    class="approve-request-btn"
                                    onclick="markAsDistributed('${notification.requestId}')"
                                >
                                    📦 Mark as Distributed
                                </button>

                            </div>

                        `;

                    }


                    // ==================================================
                    // REJECTED
                    // ==================================================

                    else if (
                        notification.status ===
                        "Rejected"
                    ) {

                        actionHTML = `

                            <div class="notification-status-rejected">
                                ❌ Request Rejected
                            </div>

                        `;

                    }


                    // ==================================================
                    // PENDING
                    // ==================================================

                    else {

                        actionHTML = `

                            <div class="notification-actions">

                                <button
                                    class="approve-request-btn"
                                    onclick="handleRequestDecision('${notification.requestId}', 'Approved')"
                                >
                                    ✓ Approve Request
                                </button>

                                <button
                                    class="reject-request-btn"
                                    onclick="handleRequestDecision('${notification.requestId}', 'Rejected')"
                                >
                                    ✕ Reject Request
                                </button>

                            </div>

                        `;
                    }


                    card.innerHTML = `

                        <div class="notification-icon">
                            🔔
                        </div>


                        <div class="notification-content">

                            <h3>
                                New Clothing Request
                            </h3>


                            <p>

                                <strong>
                                    ${notification.receiverName || "Receiver"}
                                </strong>

                                requested your clothing item

                                <strong>
                                    ${notification.item || "Clothing"}
                                </strong>.

                            </p>


                            <div class="notification-details">

                                <span>
                                    👤 Receiver:
                                    ${notification.receiverName || ""}
                                </span>


                                <span>
                                    📧 Email:
                                    ${notification.receiverEmail || ""}
                                </span>


                                <span>
                                    👕 Item:
                                    ${notification.item || ""}
                                </span>


                                <span>
                                    📅 Date:
                                    ${notification.date || ""}
                                </span>

                            </div>


                            ${actionHTML}

                        </div>

                    `;


                    notificationList.appendChild(
                        card
                    );
                }
            );


    } catch (error) {

        console.error(
            "Notification loading error:",
            error
        );


        notificationList.innerHTML = `

            <div class="empty-notifications">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h2>
                    Unable to Load Notifications
                </h2>

                <p>
                    Please make sure JSON Server is running.
                </p>

            </div>

        `;
    }
}


// ============================================================
// APPROVE / REJECT REQUEST
// ============================================================

async function handleRequestDecision(
    requestId,
    status
) {

    if (!requestId) {

        alert(
            "Request ID is missing."
        );

        return;
    }


    const confirmed =
        confirm(

            status === "Approved"

                ? "Are you sure you want to approve this request?"

                : "Are you sure you want to reject this request?"

        );


    if (!confirmed) {
        return;
    }


    try {

        // ====================================================
        // GET REQUEST
        // ====================================================

        const requestResponse =
            await fetch(
                `${API_URL}/requests/${requestId}`
            );


        if (!requestResponse.ok) {

            throw new Error(
                "Request not found."
            );
        }


        const request =
            await requestResponse.json();


        // ====================================================
        // UPDATE REQUEST STATUS
        // ====================================================

        const updateResponse =
            await fetch(
                `${API_URL}/requests/${requestId}`,
                {

                    method:
                        "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            status:
                                status
                        })

                }
            );


        if (!updateResponse.ok) {

            throw new Error(
                "Unable to update request status."
            );
        }


        // ====================================================
        // RECEIVER NOTIFICATION
        // ====================================================

        const receiverNotification = {

            id:
                "NOTIF" +
                Date.now(),

            donorEmail:
                request.donorEmail ||
                "",

            donorName:
                request.donorName ||
                "Donor",

            receiverName:
                request.receiverName ||
                "Receiver",

            receiverEmail:
                request.receiverEmail ||
                "",

            clothingId:
                request.clothingId,

            item:
                request.item ||
                "",

            requestId:
                request.id,

            type:
                "request-status",

            status:
                status,

            message:

                status === "Approved"

                    ? `Your request for ${
                        request.item ||
                        "clothing"
                      } has been approved by the donor.`

                    : `Your request for ${
                        request.item ||
                        "clothing"
                      } has been rejected by the donor.`,

            date:
                new Date()
                    .toLocaleString(),

            read:
                false
        };


        const notificationResponse =
            await fetch(
                `${API_URL}/notifications`,
                {

                    method:
                        "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            receiverNotification
                        )

                }
            );


        if (
            !notificationResponse.ok
        ) {

            console.error(
                "Receiver notification could not be saved."
            );
        }


        // ====================================================
        // UPDATE ORIGINAL DONOR NOTIFICATION
        // ====================================================

        const notificationsResponse =
            await fetch(
                `${API_URL}/notifications`
            );


        if (
            notificationsResponse.ok
        ) {

            const allNotifications =
                await notificationsResponse.json();


            const originalNotification =
                allNotifications.find(
                    notification =>

                        String(
                            notification.requestId ||
                            ""
                        )
                        ===
                        String(
                            requestId
                        )

                        &&

                        String(
                            notification.donorEmail ||
                            ""
                        )
                        .trim()
                        .toLowerCase()

                        ===

                        String(
                            request.donorEmail ||
                            ""
                        )
                        .trim()
                        .toLowerCase()

                        &&

                        notification.type !==
                        "request-status"

                        &&

                        notification.type !==
                        "distribution-status"
                );


            if (originalNotification) {

                await fetch(
                    `${API_URL}/notifications/${originalNotification.id}`,
                    {

                        method:
                            "PATCH",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({

                                status:
                                    status,

                                read:
                                    true

                            })

                    }
                );

            }

        }


        alert(

            status === "Approved"

                ? "Request Approved successfully! ✅"

                : "Request Rejected successfully! ❌"

        );


        await loadDonorNotifications();


    } catch (error) {

        console.error(
            "Request decision error:",
            error
        );


        alert(
            "Unable to update request.\n\n" +
            error.message
        );
    }
}


// ============================================================
// MARK REQUEST AS DISTRIBUTED
// ============================================================

async function markAsDistributed(
    requestId
) {

    if (!requestId) {

        alert(
            "Request ID is missing."
        );

        return;
    }


    const confirmed =
        confirm(
            "Have you handed over this clothing to the receiver?"
        );


    if (!confirmed) {
        return;
    }


    try {

        // ====================================================
        // GET REQUEST
        // ====================================================

        const response =
            await fetch(
                `${API_URL}/requests/${requestId}`
            );


        if (!response.ok) {

            throw new Error(
                "Request not found."
            );
        }


        const request =
            await response.json();


        // ====================================================
        // CHECK APPROVED
        // ====================================================

        if (
            request.status !==
            "Approved"
        ) {

            alert(
                "Only an approved request can be marked as distributed."
            );

            return;
        }


        // ====================================================
        // UPDATE REQUEST
        // ====================================================

        const updateResponse =
            await fetch(
                `${API_URL}/requests/${requestId}`,
                {

                    method:
                        "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            status:
                                "Distributed"

                        })

                }
            );


        if (!updateResponse.ok) {

            throw new Error(
                "Unable to update distribution status."
            );
        }


        // ====================================================
        // UPDATE DONATION TO DISTRIBUTED
        // ====================================================

        if (request.clothingId) {

            const donationResponse =
                await fetch(
                    `${API_URL}/donations/${request.clothingId}`,
                    {

                        method:
                            "PATCH",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({

                                status:
                                    "Distributed"

                            })

                    }
                );


            if (
                !donationResponse.ok
            ) {

                console.error(
                    "Donation status could not be updated."
                );
            }
        }


        // ====================================================
        // NOTIFY RECEIVER
        // ====================================================

        const distributionNotification = {

            id:
                "NOTIF" +
                Date.now(),

            donorEmail:
                request.donorEmail ||
                "",

            donorName:
                request.donorName ||
                "Donor",

            receiverName:
                request.receiverName ||
                "Receiver",

            receiverEmail:
                request.receiverEmail ||
                "",

            clothingId:
                request.clothingId,

            item:
                request.item ||
                "",

            requestId:
                request.id,

            type:
                "distribution-status",

            status:
                "Distributed",

            message: `${request.donorName || "Donor"} has handed over your ${request.item} successfully.`,

            date:
                new Date()
                    .toLocaleString(),

            read:
                false
        };


        const distributionResponse =
            await fetch(
                `${API_URL}/notifications`,
                {

                    method:
                        "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            distributionNotification
                        )

                }
            );


        if (
            !distributionResponse.ok
        ) {

            console.error(
                "Distribution notification could not be saved."
            );
        }


        // ====================================================
        // UPDATE ORIGINAL DONOR NOTIFICATION
        // ====================================================

        const notificationsResponse =
            await fetch(
                `${API_URL}/notifications`
            );


        if (
            notificationsResponse.ok
        ) {

            const allNotifications =
                await notificationsResponse.json();


            const originalNotification =
                allNotifications.find(
                    notification =>

                        String(
                            notification.requestId ||
                            ""
                        )
                        ===
                        String(
                            requestId
                        )

                        &&

                        String(
                            notification.donorEmail ||
                            ""
                        )
                        .trim()
                        .toLowerCase()

                        ===

                        String(
                            request.donorEmail ||
                            ""
                        )
                        .trim()
                        .toLowerCase()

                        &&

                        notification.type !==
                        "request-status"

                        &&

                        notification.type !==
                        "distribution-status"
                );


            if (originalNotification) {

                await fetch(
                    `${API_URL}/notifications/${originalNotification.id}`,
                    {

                        method:
                            "PATCH",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({

                                status:
                                    "Distributed",

                                read:
                                    true

                            })

                    }
                );
            }
        }


        alert(
            "Clothing marked as Distributed successfully! ✅"
        );


        await loadDonorNotifications();


    } catch (error) {

        console.error(
            "Distribution error:",
            error
        );


        alert(
            "Unable to mark clothing as distributed.\n\n" +
            error.message
        );
    }
}


// ============================================================
// RECEIVER NOTIFICATIONS
// ============================================================

async function loadReceiverNotifications() {

    const list =
        document.getElementById(
            "receiverNotificationsList"
        );

    const count =
        document.getElementById(
            "receiverNotificationCount"
        );


    if (!list) {
        return;
    }


    const user =
        getLoggedInUser();


    if (!user) {

        window.location.href =
            "login.html";

        return;
    }


    if (
        String(user.userType)
            .toLowerCase()
        !== "receiver"
    ) {

        window.location.href =
            "donor.html";

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/notifications`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load notifications"
            );
        }


        const notifications =
            await response.json();


        const myNotifications =
            notifications.filter(
                notification =>

                    String(
                        notification.receiverEmail || ""
                    )
                    .trim()
                    .toLowerCase()

                    ===

                    String(
                        user.email || ""
                    )
                    .trim()
                    .toLowerCase()

                    &&

                    (
                        notification.type ===
                        "request-status"

                        ||

                        notification.type ===
                        "distribution-status"
                    )
            );


        // ====================================================
        // UNREAD COUNT
        // ====================================================

        if (count) {

            count.textContent =
                myNotifications.filter(
                    notification =>
                        notification.read !== true
                ).length;
        }


        // ====================================================
        // EMPTY
        // ====================================================

        if (
            myNotifications.length ===
            0
        ) {

            list.innerHTML = `

                <div class="empty-notifications">

                    <div class="empty-icon">
                        🔔
                    </div>

                    <h2>
                        No Notifications
                    </h2>

                    <p>
                        You don't have any new updates.
                    </p>

                </div>

            `;

            return;
        }


        list.innerHTML =
            "";


        // ====================================================
        // DISPLAY
        // ====================================================

        myNotifications
            .slice()
            .reverse()
            .forEach(
                notification => {

                    const card =
                        document.createElement(
                            "div"
                        );


                    card.className =
                        "notification-card";


                    let title =
                        "Notification";


                    let icon =
                        "🔔";


                    if (
                        notification.type ===
                        "request-status"
                    ) {

                        if (
                            notification.status ===
                            "Approved"
                        ) {

                            title =
                                "Request Approved";

                            icon =
                                "✅";

                        } else if (
                            notification.status ===
                            "Rejected"
                        ) {

                            title =
                                "Request Rejected";

                            icon =
                                "❌";
                        }

                    } else if (
                        notification.type ===
                        "distribution-status"
                    ) {

                        title =
                            "Clothing Distributed";

                        icon =
                            "📦";
                    }


                    card.innerHTML = `

                        <div class="notification-icon">
                            ${icon}
                        </div>


                        <div class="notification-content">

                            <h3>
                                ${title}
                            </h3>


                            <p>
                                ${
                                    notification.message ||
                                    ""
                                }
                            </p>


                            <div class="notification-details">

                                <span>
                                    👕 Item:
                                    ${
                                        notification.item ||
                                        "Clothing"
                                    }
                                </span>


                                <span>
                                    📅 Date:
                                    ${
                                        notification.date ||
                                        ""
                                    }
                                </span>

                            </div>

                        </div>

                    `;


                    // Mark notification as read
                    card.addEventListener(
                        "click",
                        async function () {

                            if (
                                notification.read !==
                                true
                            ) {

                                try {

                                    await fetch(
                                        `${API_URL}/notifications/${notification.id}`,
                                        {

                                            method:
                                                "PATCH",

                                            headers: {
                                                "Content-Type":
                                                    "application/json"
                                            },

                                            body:
                                                JSON.stringify({
                                                    read:
                                                        true
                                                })

                                        }
                                    );

                                } catch (
                                    error
                                ) {

                                    console.error(
                                        "Read status error:",
                                        error
                                    );
                                }
                            }

                        }
                    );


                    list.appendChild(
                        card
                    );
                }
            );


    } catch (error) {

        console.error(
            "Receiver notification error:",
            error
        );


        list.innerHTML = `

            <div class="empty-notifications">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h2>
                    Unable to Load Notifications
                </h2>

                <p>
                    Please make sure JSON Server is running.
                </p>

            </div>

        `;
    }
}


// ============================================================
// PAGE INITIALIZATION
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // ====================================================
        // PROFILE
        // ====================================================

        loadProfile();


        // ====================================================
        // NAV USER
        // ====================================================

        showLoggedInUser();


        // ====================================================
        // DONOR DASHBOARD
        // ====================================================

        if (
            document.getElementById("donorName") ||
            document.getElementById("totalDonations")
        ) {

            loadDonorDashboard();
        }


        // ====================================================
        // RECEIVER DASHBOARD
        // ====================================================

        if (
            document.getElementById("receiverName") ||
            document.getElementById("availableCount")
        ) {

            loadReceiverDashboard();
        }


        // ====================================================
        // DONATE PAGE
        // ====================================================

        if (
            document.getElementById("donationForm")
        ) {

            loadDonatePage();
        }


        // ====================================================
        // AVAILABLE CLOTHES
        // ====================================================

        if (
            document.getElementById("clothesGrid")
        ) {

            loadClothesPage();
        }


        // ====================================================
        // MY REQUESTS
        // ====================================================

        if (
            document.getElementById("requestsList")
        ) {

            loadMyRequestsPage();
        }


        // ====================================================
        // MY DONATIONS
        // ====================================================

        if (
            document.getElementById("donationsList")
        ) {

            loadMyDonationsPage();
        }


        // ====================================================
        // ADMIN
        // ====================================================

        if (
            document.getElementById("adminDonations")
        ) {

            loadAdminDonations();
        }


        // ====================================================
        // DONOR NOTIFICATIONS
        // ====================================================

        if (
            document.getElementById("notificationsList")
        ) {

            loadDonorNotifications();
        }


        // ====================================================
        // RECEIVER NOTIFICATIONS
        // ====================================================

        if (
            document.getElementById(
                "receiverNotificationsList"
            )
        ) {

            loadReceiverNotifications();
        }

    }
);
// ==========================================
// DELETE DONATION - JSON SERVER
// ==========================================

async function deleteDonation(donationId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this donation?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/donations/${encodeURIComponent(donationId)}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {

            throw new Error(
                "Failed to delete donation"
            );

        }

        alert("Donation deleted successfully! 🗑️");

        window.location.reload();

    } catch (error) {

        console.error(
            "Delete donation error:",
            error
        );

        alert(
            "Unable to delete donation. Please make sure JSON Server is running."
        );

    }

}