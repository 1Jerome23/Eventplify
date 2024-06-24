var deleteBtn = document.querySelectorAll(".trashicon");

deleteBtn.forEach((button) => {
  button.addEventListener("click", async function (event) {
    var budgetID = event.target.id;
    console.log(budgetID);

    try {
      const response = await fetch(`/deleteBudget/${budgetID}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Handle success message
        alert("item deleted successfully");
        window.location.reload();
      } else {
        const error = await response.json();
        console.error("Error:", error.message); // Handle error message
      }
    } catch (error) {
      alert("Error:", error); // Handle network error
      //window.location.reload();
    }
  });
});
