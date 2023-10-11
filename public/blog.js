import {initializeApp} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
    doc,
    getFirestore,
    collection,
    serverTimestamp,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

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

//This part accesses the pathname component of the current URL which has the ID of the clicked post
let blogId = decodeURI(location.pathname.split("/").pop());

let docRef = doc(collection(db, "posts"), blogId); // Construct the document reference
// Equivalent to:
// let docRef = db.collection("posts").doc(blogId);

getDoc(docRef)
    .then((docSnapshot) => {
        if (docSnapshot.exists()) {    //check if we have the document in the database
            RenderBlogPost(docSnapshot);
        } else {
            location.replace("/");
        }
    })
    .catch((error) => {
        console.error("Error fetching post:", error);
    });


function RenderBlogPost(posts) {
    const post = posts.data()
    const date = post.timestamp.toDate();
    const time = date.toLocaleString()
    const blogPostContainer = document.getElementById("blog-post")
    blogPostContainer.innerHTML = `
          <div class=" blog-container">
                <img class="img-fluid card-img-top" src="${post.imageUrl}" alt="">
                <span><small>Published At: ${time}</small></span>
                <h3 class="text-start text-dark blog-title-text">${post.title}</h3>
                <p class="text-start px-lg-5 px-0 blog-text blog-title-text">${post.article}</p>
           </div>
        `;

}
