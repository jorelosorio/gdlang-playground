import { FolderStructure } from './folder-structure';

export async function populateExamples(
  dropdown: HTMLElement,
): Promise<boolean> {
  try {
    const response = await fetch('static/examples.json');
    const data = await response.json();
    populateDropdown(dropdown, data);
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

function populateDropdown(dropdown: HTMLElement, data: FolderStructure[]) {
  data.forEach((item: FolderStructure) => {
    if (item.children && item.children.length > 0) {
      const optGroup = document.createElement('optgroup');
      optGroup.label = item.name;
      dropdown.appendChild(populateDropdown(optGroup, item.children));
    } else {
      const option = document.createElement('option');
      option.value = item.path;
      option.textContent = item.name;
      dropdown.appendChild(option);
    }
  });

  return dropdown;
}
