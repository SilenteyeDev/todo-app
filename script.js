var listArray = [];

$(document).ready(function() {
  $(".input-field input.todo-input").on("input", function() {
    let userValue = $(this).val();
    if (userValue.replace(/\s/g, "").length) {
      $(".input-field button.add-btn").addClass("active");
    } else {
      $(".input-field button.add-btn").removeClass("active");
    }
  });

  showTasks();

  $(".input-field button.add-btn").click(function() {
    let userValue = $(".input-field input.todo-input").val();
    let localStorageData = localStorage.getItem("New Todo");
    if (localStorageData === null) {
      listArray = [];
    } else {
      listArray = JSON.parse(localStorageData);
    }

    listArray.push(userValue);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();

    $(this).removeClass("active");
  });

  $(".footer button.delete-all-btn").click(function() {
    let confirmPrompt = confirm("You cannot undo this action!\n\nAre you sure you want to clear all of your tasks?");
    if (confirmPrompt == true) {
      listArray = [];
      localStorage.setItem("New Todo", JSON.stringify(listArray));
      showTasks();
    }
  });
});

function showTasks() {
  let localStorageData = localStorage.getItem("New Todo");
  if (localStorageData === null) {
    listArray = [];
  } else {
    listArray = JSON.parse(localStorageData);
  }

  $(".pending-tasks").text(listArray.length);
  if (listArray.length > 0) {
    $(".footer button.delete-all-btn").addClass("active");
  } else {
    $(".footer button.delete-all-btn").removeClass("active");
  }

  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index});"><i class="fas fa-trash"></i></span></li>`;
  });
  $("ul.todo-list").html(newLiTag);
  $(".input-field input.todo-input").val("");
  
  // Delete task button hover support for mobile
  if (screen.width < 1024) {
    $(document).click(function(e) {
      if ($(e.target).has(".icon").length && e.target.tagName == "li") {
        $(e.target).children(".icon").toggleClass("active");
      }
    });
  }
}

function deleteTask(index) {
  let confirmPrompt = confirm("You cannot undo this action!\n\nAre you sure you want to delete this task?");
  if (confirmPrompt == true) {
    let localStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(localStorageData);

    listArray.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
  }
}
