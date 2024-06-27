var deleteBtn = document.querySelectorAll(".guestdeleteicon");

deleteBtn.forEach((button) => {
  button.addEventListener("click", async function (event) {
    var guestID = event.target.id;
    console.log(guestID);

    try {
      const response = await fetch(`/deleteGuestTable?id=${guestID}`, {
        method: "POST",
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

var tableDeleteBtn = document.querySelectorAll(".trashicon");

tableDeleteBtn.forEach((button) => {
  button.addEventListener("click", async function (event) {
    var tableID = event.target.id;
    console.log(tableID);

    try {
      const response = await fetch(`/deleteTable/${tableID}`, {
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
