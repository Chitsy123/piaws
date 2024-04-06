const albumId = 'APdi2pPCwGUXeHHAu-U4u7AZ_HWTP3jMMQt2MouvpOAg7qtXKMjJd8RQNi8oCpcvIjjgJHaJXZrA'; // Replace with your Google Photos album ID
const apiKey = 'AIzaSyDgc_-I7Jil3Xc6YzXwYcO-0a4f5I6jYzg'; // Replace with your Google API key
const maxResults = 5; // Maximum number of images to fetch (set to 5)

const apiUrl = `https://photoslibrary.googleapis.com/v1/albums/${albumId}/mediaItems?key=${apiKey}&pageSize=${maxResults}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const images = data.mediaItems.map(item => item.baseUrl);
    const gallery = document.getElementById('gallery');
    let currentIndex = 0;
    let roundCount = 0;

    function showImage(index) {
      gallery.innerHTML = ''; // Clear existing images
      const img = document.createElement('img');
      img.src = images[index];
      img.alt = data.mediaItems[index].filename;
      img.classList.add('image');
      gallery.appendChild(img);
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
      if (currentIndex === 0) {
        roundCount++;
        if (roundCount === 2) { // Change 2 to the number of rounds you want to complete before refreshing
          location.reload();
        }
      }
    }

    // Show the first image
    showImage(currentIndex);

    // Automatically advance to the next image every 3 seconds
    setInterval(nextImage, 3000);
  })
  .catch(error => {
    console.error('Error fetching images:', error);
  });
