//pseudocode
/*
  1.Grab the accordion buttons from the DOM
  2. go through each accordion button one by one
  3. Use the classlist dom method in combination with the toggle method provided by the DOM to add or remove the "is-open" class. At this point, the accordion button should be able to switch back and forth between its font awesome icons but there is no content inside of it. This is because of the overflow:hidden and the max-height of zero; it is hiding our content. So now we must use javascript to change these values with DOM CSS
  4. get the div that has the content of the accordion button you are currently looking at; we do this using the .nextElementSibling method which allows us to look at the html element that is directly next to the current html element we are looking at. Since we are currently looking at a button (accordion button), the next element after that is the div with the class accordion-content. This is exactly what we want because it allows us to work with the div that has the content that we want to display. Also please note that we could have got to this div in another way but this is the "shortest path" to our answer.
  
  5. set the max-height based on whether the current value of the max-height css property. If the max-height is currently 0 (if the page has just been visited for the first time) or null (if it has been toggled once already) which means that it is closed, you will give it an actual value so the content will be shown; if not then that means the max-height currently has a value and you can set it back to null to close it.
  6. If the accordion is closed we set the max-height of the currently hidden text inside the accordion from 0 to the scroll height of the content inside the accordion. The scroll height refers to the height of an html element in pixels. For this specific example, we are talking about the height of the div with the class accordion-content with all of its nested ptags
*/


// Select all accordion buttons
const accordionBtns = document.querySelectorAll(".accordion");

// Add event listeners to each accordion button
accordionBtns.forEach((accordion, index) => {
  // Click event to toggle accordion
  accordion.addEventListener("click", function () {
    toggleAccordion(this);
  });

  // Keyboard navigation
  accordion.addEventListener("keydown", (event) => {
    handleKeyboardNavigation(event, index);
  });
});

// Function to toggle accordion
function toggleAccordion(button) {
  const isOpen = button.getAttribute("aria-expanded") === "true";
  const content = button.nextElementSibling;

  // Update ARIA attributes and toggle visibility
  button.setAttribute("aria-expanded", !isOpen);
  content.hidden = isOpen;
  content.style.maxHeight = isOpen ? null : content.scrollHeight + "px";
}

// Function to handle keyboard navigation
function handleKeyboardNavigation(event, index) {
  const key = event.key;
  const totalAccordions = accordionBtns.length;

  switch (key) {
    case "ArrowDown": {
      event.preventDefault();
      // Focus the next accordion button, loop back to the first if necessary
      const nextIndex = (index + 1) % totalAccordions;
      accordionBtns[nextIndex].focus();
      break;
    }
    case "ArrowUp": {
      event.preventDefault();
      // Focus the previous accordion button, loop back to the last if necessary
      const prevIndex = (index - 1 + totalAccordions) % totalAccordions;
      accordionBtns[prevIndex].focus();
      break;
    }
    case "Home": {
      event.preventDefault();
      // Focus the first accordion button
      accordionBtns[0].focus();
      break;
    }
    case "End": {
      event.preventDefault();
      // Focus the last accordion button
      accordionBtns[totalAccordions - 1].focus();
      break;
    }
    case "Enter":
    case " ": {
      event.preventDefault();
      // Toggle the accordion panel
      toggleAccordion(accordionBtns[index]);
      break;
    }
  }
}
