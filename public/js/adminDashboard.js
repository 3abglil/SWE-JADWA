
// for menu sidebar drop
const listItems = document.querySelectorAll(".sidebar-list li");

listItems.forEach((item) => {
  item.addEventListener("click", () => {
    let isActive = item.classList.contains("active");

    listItems.forEach((el) => {
      el.classList.remove("active");
    });

    if (isActive) item.classList.remove("active");
    else item.classList.add("active");
  });
});

const toggleSidebar = document.querySelector(".toggle-sidebar");
const logo = document.querySelector(".logo-box");
const sidebar = document.querySelector(".sidebar");

toggleSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

logo.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

  function deleteUser(id) {
    console.log(id);
    fetch(`/admin/delete/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // Remove the deleted user element from the DOM
          const deletedUserElement = document.getElementById(`user-${id}`);
          if (deletedUserElement) {
            deletedUserElement.remove();
            
          } else {
            console.error('Deleted user element not found in the DOM.');
          }
        } else {
          console.error('Error removing user:', response.status);
          // Handle the error
        }
      })
      .catch(error => {
        console.error('Error removing user:', error);
        // Handle the error
      });
  }
  




