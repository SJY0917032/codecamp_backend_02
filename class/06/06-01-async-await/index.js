import axios from "axios";

async function fetchPost() {
    const POSTS_DATA = await axios.get("https://koreanjson.com/posts/1")
    console.log(POSTS_DATA);
}

fetchPost()