import { uid } from "uid";
export default class ToDo {
    constructor(title, description, date, priority, type, endDate = null, frequency = null) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.type = type;
        this.isChecked = false;
        this.id = uid(16);
        this.endDate = endDate;
        this.frequency = frequency;
    }
}
