// Import Firebase modules
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"; // Import Firestore modules

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

// Define a function to format the date as "01 Jan 2045"
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
}

function renderPost(posts) {
    const post = posts.data()
    const postsContainer = document.getElementById("posts-container");
    const date = post.timestamp.toDate();

    // Format the date as a string
    const Date =  formatDate(date); // Customize the format as needed
    const time = date.toLocaleTimeString()
    postsContainer.innerHTML = `
          <div class="col-lg-6 col-xl-4">
                <div class="blog-item wow fadeIn" data-wow-delay="0.1s">
                    <div class="blog-img position-relative overflow-hidden">
                        <img src="${post.imageUrl}" class="img-fluid w-100" alt="image-name">
                        <div class="bg-primary d-inline px-3 py-2 text-center text-white position-absolute top-0 end-0">
                            ${Date}
                        </div>
                    </div>
                    <div class="p-4">
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
                        <a href="" class="d-inline-block h4 lh-sm mb-3">${post.title}</a>
                        <p class="mb-4">${post.article.substring(0, 170)}...</p>
                        <a href="/${posts.id}" class="btn btn-primary px-3">More Details</a>
                    </div>
                </div>
            </div>
    ${postsContainer.innerHTML}
    `

}




// Function to fetch and render posts from Firestore
async function fetchAndRenderPosts() {
    const postsCollection = collection(db, "posts"); // Change "posts" to your Firestore collection name
    const querySnapshot = await getDocs(postsCollection);

    querySnapshot.forEach((doc) => {
        renderPost(doc);
    });
}

// Add an event listener to call fetchAndRenderPosts when the page loads
window.addEventListener("load", () => {
    fetchAndRenderPosts();
});