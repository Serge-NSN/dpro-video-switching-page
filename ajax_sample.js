let number = 0;
let data = []; // Stores the data retrieved from ajax.json

const button = document.getElementById('btn');
const titleArea = document.getElementById("title");
const contentArea = document.getElementById("content");
const videoArea = document.getElementById("video");

// Function to retrieve data from ajax.json
function getData(callback) {
  const request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      data = request.response; // Save data locally to reuse later
      callback(); // Proceed to show first video
    }
  };
  request.open("GET", "ajax.json");
  request.responseType = "json";
  request.send(null);
}

// Function to handle button clicks and update video content
function changeVideo() {
  button.addEventListener('click', () => {
    // Load from server only once
    if (data.length === 0) {
      getData(updateContent);
    } else {
      updateContent();
    }
  });
}

// Function to update the displayed video info
function updateContent() {
  if (data.length > 0) {
    titleArea.innerHTML = data[number].title;
    contentArea.innerHTML = data[number].content;
    videoArea.setAttribute("src", data[number].url);

    // Loop back to the first video after the last
    number = (number + 1) % data.length;
  }
}

window.onload = changeVideo;
