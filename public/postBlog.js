import {initializeApp} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
    doc,
    getFirestore,
    collection,
    serverTimestamp,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js"; // Import Firebase Storage modules

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
const storage = getStorage(app); // Initialize Firebase Storage


// Add an event listener to the form submission
const form = document.querySelector('#form-post');
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const spinner = document.getElementById('loading')
    const postBtn = document.getElementById('btn-post')
    spinner.style.setProperty('display', 'block', 'important')
    spinner.style.setProperty('display', 'flex', 'important')
    spinner.style.setProperty('justify-content', 'center', 'important')
    postBtn.style.setProperty('display', 'none', 'important')
    // Get form inputs
    const category = document.getElementById('category').value;
    const imageFile = document.getElementById('image').files[0]; // Assuming only one image is selected
    const title = document.getElementById('title').value;
    const article = document.getElementById('article').value;

    // Create a new post document in Firestore
    const postsCollection = collection(db, 'posts'); // Replace 'posts' with your actual Firestore collection name
    const post = {
        category,
        title,
        article,
        timestamp: serverTimestamp() // Add a server-generated timestamp
    };

    try {
        // Upload the image to Firebase Storage
        const imageRef = ref(storage, 'images/' + imageFile.name); // Define the storage path for images
        const uploadTask = uploadBytesResumable(imageRef, imageFile)
        await uploadTask;
        // Get the download URL of the uploaded image
        // Add the image URL to the post data
        post.imageUrl = await getDownloadURL(imageRef)

        // Add the post document to the Firestore collection
        await setDoc(doc(postsCollection), post); // Specify the collection reference

        // Reset the form
        form.reset();
        spinner.style.setProperty('display', 'none', 'important')
        postBtn.style.setProperty('display', 'block', 'important')
        //alert('Post created successfully!')
        location.href = "/"
    } catch (error) {
        console.error('Error creating post:', error)
    }
});