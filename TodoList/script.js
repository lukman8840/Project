// Wait for the window to finish loading before executing the script
    window.addEventListener('load', () => {
    // Get references to relevant HTML elements
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const dueDateInput = document.querySelector("#new-task-due-date");
    const list_el = document.querySelector("#tasks");

    // Add an event listener to the form for the 'submit' event
    form.addEventListener('submit', (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        const task = input.value.trim(); // Trim to remove leading/trailing whitespace
        const dueDate = dueDateInput.value;

        // Check if the task is empty
        if (!task) {
            alert("Please enter a task.");
            return; // Prevent adding empty tasks
        }

        // Function to create HTML elements for the new task
        function createElement(task, dueDate) {
            // Create HTML elements for the new task
            const task_el = document.createElement("div");
            task_el.classList.add("task");

            const task_content_el = document.createElement("div");
            task_content_el.classList.add("content");

            const task_input_el = document.createElement("input");
            task_input_el.classList.add("text");
            task_input_el.type = "text";
            task_input_el.value = task;
            task_input_el.setAttribute("readonly", "readonly");

            
            task_input_el.style.background = "#356";
            task_input_el.style.fontSize = "22px";
            task_input_el.style.padding = "8px";
            task_input_el.style.borderRadius = "12px";
            task_input_el.style.color = "#fff";
            task_input_el.style.textAlign = "center";
            task_input_el.style.width = "200px";


            const due_date_input_el = document.createElement("div");
            due_date_input_el.classList.add("due-date");

            const due_date_label_el = document.createElement("span");
            due_date_label_el.textContent = "Due Date: ";

            const due_date_value_el = document.createElement("span");
            due_date_value_el.textContent = dueDate;
            due_date_input_el.appendChild(due_date_label_el);
            due_date_input_el.appendChild(due_date_value_el);
            task_input_el.style.padding = "8px";
            task_input_el.style.color = "#fff";  


            const priority_select_el = document.createElement("select");
            priority_select_el.classList.add("priority");
            const priorities = ["Select Task Priority", "Low", "Medium", "High"];
            priorities.forEach(priority => {

                const option_el = document.createElement("option");
                option_el.value = priority.toLowerCase();
                option_el.textContent = priority;
                priority_select_el.appendChild(option_el);
            });


            task_content_el.appendChild(task_input_el);
            task_content_el.appendChild(due_date_input_el);
            task_content_el.appendChild(priority_select_el);


            const task_actions_el = document.createElement("div");
            task_actions_el.classList.add("actions");


            const task_edit_el = document.createElement("button");
            task_edit_el.classList.add("edit");
            task_edit_el.innerHTML = "Edit";


            const task_delete_el = document.createElement("button");
            task_delete_el.classList.add("delete");
            task_delete_el.innerHTML = "Delete";

            task_actions_el.appendChild(task_edit_el);
            task_actions_el.appendChild(task_delete_el);

            task_el.appendChild(task_content_el);
            task_el.appendChild(task_actions_el);
            list_el.appendChild(task_el);

            // Clear the input fields after adding a task
            input.value = "";
            dueDateInput.value = "";

            // Add event listener for the 'Edit' button
            task_edit_el.addEventListener('click', () => {
                if (task_edit_el.innerText.toLowerCase() == "edit") {
                    // Enable editing of the task input
                    task_input_el.removeAttribute("readonly");
                    // Save the edited task and disable editing
                    task_input_el.focus();
                    task_edit_el.innerText = "Save";
                } else {
                    task_input_el.setAttribute("readonly", "readonly");
                    task_edit_el.innerText = "Edit";
                }
            });

            // Add event listener for the 'Delete' button
            task_delete_el.addEventListener('click', () => {
                // Remove the task element from the list
                list_el.removeChild(task_el);
            });
        }

        // Call the createElement function with task and dueDate
        createElement(task, dueDate);
    });
});
