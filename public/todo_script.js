var todos = document.querySelectorAll(".todos");
var deleteBtn = document.querySelectorAll(".deleteTask");

var todoID;

todos.forEach((button) => {
  button.addEventListener("click", async function (event) {
    todoID = event.target.id;
    console.log(todoID);

    try {
      const response = await fetch(`/modifyTodoStatus?id=${todoID}`, {
        method: "GET",
      });

      const result = await response.json();
      if (response.ok) {
        console.log(todoID + " modified");
      } else {
        console.log("wala na pinish na");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

deleteBtn.forEach((button) => {
  button.addEventListener("click", async function (event) {
    todoID = event.target.id;
    console.log(todoID);

    try {
      const response = await fetch(`/deleteTask/${todoID}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Handle success message
        window.location.reload();
      } else {
        const error = await response.json();
        console.error("Error:", error.message); // Handle error message
      }
    } catch (error) {
      alert("Error:", error); // Handle network error
    }
  });
});
