/**
 * Loads HTML content into elements that have the w3-include-html attribute.
 *
 * This function goes through all elements of the document and searches for the
 * "w3-include-html" attribute specifying the path to an HTML file. For each one found
 * Element initiates an XMLHttpRequest to load the specified HTML content.
 * After loading, the content of the target element is replaced with the loaded HTML.
 * In case of an error (e.g. if the page is not found), an error message is displayed
 * displayed in the element. After loading the content, the "w3-include-html" attribute is removed,
 * and the function is called recursively to ensure that all elements are processed,
 * that were added while loading an HTML content.
 */
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  // Gets all elements of the document
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      // Reads the value of the "w3-include-html" attribute
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
          // Initializes an HTTP request to load the HTML content
          xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
              if (this.readyState == 4) { // When the request is complete
                  if (this.status == 200) {elmnt.innerHTML = this.responseText;} // If successful, replace the content
                  if (this.status == 404) {elmnt.innerHTML = "Page not found.";} // If failed, display an error message
                  // Removes the attribute to avoid double processing
                  elmnt.removeAttribute("w3-include-html");
                  includeHTML(); // Recursive call to load additional content
              }
          };
          xhttp.open("GET", file, true);
          xhttp.send(); // Sends the request
          return; // Terminates the function after starting the request
      }
  }
}