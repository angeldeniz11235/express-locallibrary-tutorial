var mongoose = require('mongoose');

var Schema = mongoose.Schema

const moment = require('moment');

var AuthorSchema = new Schema({
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
});

//Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
    
// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case

var fullname = '';
if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name;
}
if (!this.first_name || !this.family_name) {
    fullname = '';
}

return fullname;
});

//Virtual for author's lifespan (formated)
AuthorSchema
.virtual('lifespan')
.get(function () {

    var birth_day = this.date_of_birth ? moment(this.date_of_birth).format('YYYY/MM/DD') : 'Unknown';
    var death_day = this.date_of_death ? moment(this.date_of_death).format('YYYY/MM/DD') : 'Present';
    return (birth_day + ' - ' + death_day);
});

//Virtual for authors date of birth formatted (needed for author_form...)
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
    var birth_day = this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : undefined;
    return birth_day;
});

//Virtual for authors date of death formatted (needed for author_form...)
AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
    var death_day = this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : undefined;
    return death_day;
});

//Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
    return '/catalog/author/' + this._id;
});


//Export model
module.exports = mongoose.model('Author', AuthorSchema);