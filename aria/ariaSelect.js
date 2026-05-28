const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // 1. Reset everything (hide panels, unselect tabs)
    tabs.forEach(t => t.setAttribute("aria-selected", "false"));
    panels.forEach(p => p.hidden = true);

    // 2. Select the clicked tab
    tab.setAttribute("aria-selected", "true");
    
    // 3. Find and show the matching panel
    const associatedPanel = tab.getAttribute("aria-controls");
    const panel = document.getElementById(associatedPanel);
    if (panel) {
      panel.hidden = false; // <--- This reveals the panel!
    }
  });
});