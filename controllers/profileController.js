const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.editProfile = async (req, res) => {
  const userId = req.body.id;
  const newUsername = req.body.username;

  updatedData = {
    username: newUsername,
  };

  try {
    const result = await User.updateOne({ _id: userId }, updatedData);
    console.log("Update Result:", result);
    res.redirect("/profile");
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.body.id;
  const oldpassword = req.body.oldpassword;
  const newpassword = req.body.newpassword;
  const reenternewpassword = req.body.reenternewpassword;
  let errorMessage = "";

  console.log("hi");

  if (oldpassword != newpassword) {
    if (newpassword == reenternewpassword) {
      try {
        // Find user by username
        const user = await User.findById(userId);

        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }

        // Compare passwords
        const match = await bcrypt.compare(oldpassword, user.password);

        if (match) {
          // Passwords match, authentication successful
          const hashedPassword = await bcrypt.hash(newpassword, 10);
          updatedData = {
            password: hashedPassword,
          };

          try {
            const result = await User.updateOne({ _id: userId }, updatedData);
            console.log("Update Result:", result);
            res.redirect("/profile");
            //res.json({ message: "Todo status updated successfully", todo });
          } catch (error) {
            console.error("Error updating todo:", error);
            res.status(500).send("Internal Server Error");
          }
        } else {
          // Passwords don't match
          errorMessage = "Incorrect password";
          renderError(errorMessage);
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        errorMessage = "Authentication error";
        renderError(errorMessage);
      }
    } else {
      errorMessage = "Passwords don't match";
      renderError(errorMessage);
    }
  } else {
    /*
    res
      .status(500)
      .json({ message: "Old password and new password are the same" });*/
    errorMessage = "New password cannot be the same as the old password.";
    renderError(errorMessage);
  }

  function renderError(errorMessage) {
    res.render("profile_change_pw", {
      errorMessage,
      user: { _id: req.body.id },
    });
  }
};
