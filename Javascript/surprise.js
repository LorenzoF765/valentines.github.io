document.addEventListener('DOMContentLoaded', function() {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const message = document.querySelector('.message');
  
    yesButton.addEventListener('click', function() {
      message.style.display = 'block';
      yesButton.style.display = 'none';
      noButton.style.display = 'none';
    });
  
    let count = 0; // Counter to keep track of the number of times "No" button is clicked
    noButton.addEventListener('click', function() {
      noButton.textContent = 'Are you sure?';
      yesButton.style.transform = `scale(${1.1 + count * 0.1})`; // Increase size of "Yes" button
      count++;
    });
  });