class Task {
    //initialize props
    constructor(title,important, dueDate, endDate, description, location){
        this.title = title;
        this.important = important;
        this.dueDate = dueDate;
        this.endDate = endDate;
        this.description = description;
        this.location = location;

        this.user = "Joel";
        this.createOn= new Date(); // current date and time of computer
    }
}