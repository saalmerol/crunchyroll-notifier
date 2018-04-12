// Saves options to chrome.storage
function save_options() {
  var numberPopup = document.getElementById('numberPopup').value;
  chrome.storage.sync.set({
    numberPopup: parseInt(numberPopup)
  }, function() {
    // Update status to let user know options were saved.
    var button = document.getElementById('submit');
    button.innerText = 'Options saved.';
    setTimeout(function() {
      button.innerText = 'Save';
    }, 2000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    numberPopup: 5
  }, function(items) {
    document.getElementById('numberPopup').value = items.numberPopup;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('submit').addEventListener('click',
    save_options);
