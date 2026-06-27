// Grab the display element once
const display = document.getElementById('display');

// 8. Handle Mouse Clicks explicitly on the pad
const drumPads = document.querySelectorAll('.drum-pad');

drumPads.forEach(pad => {
  pad.addEventListener('click', function() {
    // 'this' refers directly to the drum-pad that was clicked
    const audio = this.querySelector('.clip');
    
    // Reset and play
    audio.currentTime = 0;
    let playPromise = audio.play();
    
    // Catch the promise to prevent test suite errors
    if (playPromise !== undefined) {
      playPromise.then(_ => {}).catch(error => {});
    }
    
    // Update display with the pad's ID
    display.innerText = this.id.replace(/-/g, ' ');
  });
});

// 9. Handle Keyboard Presses (Bulletproof for FCC tests)
document.addEventListener('keydown', function(event) {
  // FCC sometimes simulates keys using keyCode instead of event.key
  const keyChar = event.key ? event.key.toUpperCase() : String.fromCharCode(event.keyCode).toUpperCase();
  
  const audio = document.getElementById(keyChar);
  
  if (audio) {
    audio.currentTime = 0;
    let playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.then(_ => {}).catch(error => {});
    }
    
    // Grab the parent button to get the ID and add effects
    const parentPad = audio.parentElement;
    display.innerText = parentPad.id.replace(/-/g, ' ');
    
    // Visual effect
    parentPad.classList.add('active');
    setTimeout(() => {
      parentPad.classList.remove('active');
    }, 100);
  }
});