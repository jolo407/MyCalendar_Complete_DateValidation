var isItImportant = false; //flag
var detailsVisible = true;
var server = "http://fsdi.azurewebsites.net/api";


function toggleImportant() {
    if (isItImportant) {
        $("#iconImp").removeClass('fas').addClass('far');
        isItImportant = false;
    }
    else {
        $("#iconImp").removeClass('far').addClass('fas');
        isItImportant = true;
    }
}


function toggleDetails() {
    if (detailsVisible) {
        $("#section-form").hide();
        detailsVisible = false;
    }
    else {
        $("#section-form").show();
        detailsVisible = true;
    }
}


$("#btnShowDetails").click(function (event) {
    var x = $(this).text()
    if (x == "Hide details") {
        $(this).text("Show details").removeClass('far fa-eye-slash').addClass('fas fa-eye')
    }
    else {
        $(this).text("Hide details").addClass('far fa-eye-slash')
    }
})

function createTask() {
    //get values from inputs
    var title = $("#title").val();
    var dueDate = $("#date").val();
    var endDate = $("#endDate").val();
    var desc = $("#description").val();
    var location = $("#location").val()

    //apply validations
    if (title.length < 5) {
        $("#alertError").show();
        //start a timer to hide it
        //arrow function
        setTimeout(() => $("#alertError").hide(), 5000);
        return; //
    }

    if(dueDate > endDate){
        $("#dateAlert").show();
        setTimeout(() => $("#dateAlert").hide(),10000);
        return;
    }
   
    //create an object
    var task = new Task(title, isItImportant, dueDate, endDate, desc, location);
    console.log(task);

    //send object to server
    $.ajax({
        type: 'POST',
        url: server + '/tasks',
        data: JSON.stringify(task),
        contentType: 'application/json',
        success: function (res) {
            console.log("Server says:", res);

            //display tasks
            displayTask(res);
            //clear the form
            clear();
        },
        error: function (details) {
            console.log("Error:", details);
        }
    })

    
}

function displayTask(task) {
    var cssClass = '';
    if (task.important) cssClass = 'fas';
    else cssClass = 'far';

    //parse the date string into a date object
var date = new Date(task.dueDate);
console.log(date);
var endDate = new Date(task.endDate);

    var syntax =
        `<div id='task${task.id}' class='task'>
        <i class="${cssClass} far fa-star task-section"></i>
        <div class='task-desc'>
        <h5>${task.title}<h5>
        <label>${task.description}</label>
        </div>
        <label class='task-section'>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</label>
        <label id="endDate" class='task-section'>${endDate.toLocaleDateString()} ${endDate.toLocaleTimeString()}</label>
        <label class='task-section'>${task.location}</label>
        <div class='task-section'>
        <i  class="fas fa-trash" onclick='deleteTask(${task.id})'></i>
        </div>
    </div>`;
    $("#pendingTasks").append(syntax);

}

function deleteTask(id){
    console.log('Deleting', id);

    //DELETE AJAX Req
    $.ajax({
        type: 'DELETE',
        url: server + '/tasks/' +id,//url: server +'/tasks/' + id,
        success: function (res) {
            console.log("Deleted Successfully", res)

            $("#task" +id).remove(); //$("#task13").remove();
        },
        error: function(details) {
            console.log("Error", details)
        }
    });
    
}

function clear() {
    $("#title").val('');
    $("#date").val('');
    $("#endDate").val('');
    $("#description").val('');
    $("#location").val('');
    if (isItImportant) {
        //change the value
        toggleImportant();
    }

}

function fetchTasksFromServer(){
    $.ajax({
        type: 'GET',
        url: server + '/tasks',
        success: function (res){
            console.log("Data from server", res);

            //travel the array (for loop)
            for(let i=0;i<res.length;i++){
                //get each object from the array
                let task = res[i];
                if(task.user==="Joel"){
                    displayTask(task);
                    //send the object to displayTask
                }
                
                
            }
            
           },
        error: function(details){
            console.log("Error getting data", details);
        }
    });
}





function init() {
    console.log("My Calendar");

    toggleDetails();

   // load data
    fetchTasksFromServer();

    //hook events
    $("#iconImp").click(toggleImportant);
    $("#btnShowDetails").click(toggleDetails);
    $("#btn-save").click(createTask);

    $("#alertError").hide();
    $("#dateAlert").hide();
}

function testGet() {
    $.ajax({
        type: 'GET',
        url: 'https://restclass.azurewebsites.net/api/test',
        success: function (res) {
            console.log("Succeed", res);
        },
        error: function (details) {
            console.log("Error:(", details);
        }
    });
}



window.onload = init;

/**
 *
 *
 * hide the alertError when page loads
 * show it when there is an error
 *
 *
 * http requests
 * http methods
 * http status codes
 *
 *
 *
 */