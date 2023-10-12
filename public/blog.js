import {initializeApp} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
    doc,
    getFirestore,
    collection,
    getDoc,
    deleteDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import {
    getAuth,
    onAuthStateChanged
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

const deleteBtn = document.getElementById("deleteBtn");
const editBtn = document.getElementById("editBtn");

//This part accesses the pathname component of the current URL which has the ID of the clicked post
let blogId = decodeURI(location.pathname.split("/").pop());

let docRef = doc(collection(db, "posts"), blogId); // Construct the document reference


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
                <h4 class="text-start py-4 text-dark blog-title-text">${post.title}</h4>
                <div class="p text-start px-lg-5 px-0 blog-text blog-title-text">${post.article}</div>
                
           </div>
        `;

}

const DeleteEditBtn = document.getElementById('delete-edit-Btn')
onAuthStateChanged(auth, (user) => {
    if (user) {
        DeleteEditBtn.style.setProperty('display', 'flex', 'important')
        deleteBtn.addEventListener('click', async () => {
            await deleteDoc(docRef)
            alert("Post successfully deleted!")
            location.replace("/")
        })


        editBtn.addEventListener('click', () => {
            getDoc(docRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const postData = docSnapshot.data();
                        const postId = docSnapshot.id;

                        // Use JavaScript to trigger the Bootstrap modal
                        const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
                        modal.show();


                        populateEditForm(postData, postId)
                    } else {
                        location.replace("/");
                    }
                }).catch((error) => {
                console.error("Error fetching post:", error);
            });

        })

        function populateEditForm(postData, postId) {
            // Set the form fields with the existing post data
            const updateTitle = document.getElementById("updateTitle");
            const updateArticle = document.getElementById("updateArticle");
            const updateCategory = document.getElementById("updateCategory");

            updateTitle.value = postData.title;
            updateArticle.value = postData.article;
            updateCategory.value = postData.category;

            // Use JavaScript to trigger the Bootstrap modal
            const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
            modal.show();

            // Define the event listener for the "Update" button
            const updateBtn = document.getElementById("updateBtn");

            updateBtn.addEventListener('click', async () => {
                const updatedPost = {
                    title: updateTitle.value,
                    article: updateArticle.value,
                    category: updateCategory.value,
                };

                try {
                    const docRef2 = doc(collection(db, "posts"), postId);
                    await updateDoc(docRef2, updatedPost); // Corrected the order of arguments
                    alert("Post successfully updated!");
                    location.replace("/")
                } catch (error) {
                    console.error("Error updating post:", error);
                }
            });
        }
    }
})

