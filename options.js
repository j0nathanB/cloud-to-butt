// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value userOption = 'toLatinx'
  chrome.storage.sync.get({
    userOption: 'none',
  }, function(items) {
    document.getElementById(items.userOption).checked = true;
  });
}

const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
  const data = new FormData(form);
  let output = "";
  const status = document.getElementById('status');

  for (const entry of data) {
    output = entry[1];
  };

  chrome.storage.sync.set({
    userOption: output
  }, function() {

    setTimeout(function() {
      status.textContent = '';
      window.close();
    }, 2500);
  });

  status.textContent = 'Refresh page to see changes';
  event.preventDefault();
}, false);

document.addEventListener('DOMContentLoaded', restore_options);