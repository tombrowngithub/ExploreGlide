// Import Firebase modules
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
    getFirestore,
    collection,
    orderBy,
    query,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"; // Import Firestore modules

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDc3SAP5mWBWR_r883cGqW92LSXYSqFRaM",
    authDomain: "exploreglide-50ee9.firebaseapp.com",
    projectId: "exploreglide-50ee9",
    storageBucket: "exploreglide-50ee9.appspot.com",
    messagingSenderId: "12976046035",
    appId: "1:12976046035:web:24613213078205cf483926"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app)

const logout = document.getElementById('logout')
const login = document.getElementById('login')
onAuthStateChanged(auth, (user) => {
    if (user) {
        logout.style.setProperty('display', 'block', 'important')
        login.style.setProperty('display', 'none', 'important')

        logout.addEventListener('click', async () => {
            await signOut(auth)
            location.replace("/")
        })
    } else {
        logout.style.setProperty('display', 'none', 'important')
        login.style.setProperty('display', 'block', 'important')
    }
})


// Define a function to format the date as "01 Jan 2045"
function formatDate(date) {
    const options = {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    };
    return date.toLocaleDateString(undefined, options);
}

function renderPost(postDoc) {
    const post = postDoc.data();
    const postsContainer = document.getElementById("posts-container");
    const date = post.timestamp.toDate();

    // Format the date as a string
    const formattedDate = formatDate(date); // Customize the format as needed
    const time = date.toLocaleTimeString();

    // Create a new post element
    const postElement = document.createElement("div");
    postElement.className = "col-lg-6 col-xl-4";
    postElement.innerHTML = `
        <div class="blog-item card wow fadeIn" data-wow-delay="0.1s">
            <div class="blog-img position-relative overflow-hidden">
                <img src="${post.imageUrl}" class="img-fluid w-100" alt="image-name">
                <div class="bg-primary d-inline px-3 py-2 text-center text-white position-absolute top-0 end-0">
                    ${formattedDate}
                </div>
            </div>
            <div class="p-4 ">
                <div class="blog-meta d-flex justify-content-between pb-2">
                    <div class="">
                        <small><i class="fas fa-user me-2 text-muted"></i>
                            <a href="" class="text-muted me-2">
                                By Admin
                            </a>
                        </small>
                    </div>
                    <div class="">
                        <small>
                            <i class="fa fa-clock text-muted me-1"></i><span>${time}</span>
                        </small>
                    </div>
                </div>
                <h6 class="mb-0">${post.title}</h6>
                <p class="mb-4 article">${post.article.substring(0, 170)}...</p>
                <a href="/${postDoc.id}" class="btn btn-primary px-3">More Details</a>
            </div>
        </div>
    `;

    // Append the post element to the posts container
    postsContainer.appendChild(postElement);
}

// Function to fetch and render posts from Firestore
async function fetchAndRenderPosts() {
    const postsCollection = collection(db, "posts"); // Change "posts" to your Firestore collection name
    const querySnapshot = await getDocs(query(postsCollection, orderBy("timestamp", "desc"))); // Use query with orderBy

    querySnapshot.forEach((doc) => {
        renderPost(doc);
    });
}


const loginForm = document.getElementById('login-form')
const email = document.getElementById('email')
const password = document.getElementById('password')

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value)
        alert("Admin login successfully!")
        location.href = "/"
    } catch (error) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            // Display an error message to the user
            alert("Invalid email or password")

        } else if (error.code === 'auth/user-disabled') {
            alert("Your account has been disabled")

        } else if (error.code === 'auth/user-not-verified') {
            alert("Your email address has not been verified. " +
                "Please check your inbox and follow the verification link.")

        } else {
            // Handle other errors
            console.error(error)
            alert("Unknown error has occurred, try again later or contact admin")
        }
    }
})


// Add an event listener to call fetchAndRenderPosts when the page loads
window.addEventListener("load", () => {
    const explore = document.getElementById('exploreglide')
    fetchAndRenderPosts();
});