var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost/properties');

var BedSchema = new Schema({
    id: ObjectId,
    capacity: {type: Number, required: true, enum: [1, 2]}
});

var RoomSchema = new Schema({
    id: ObjectId,
    name: {type: String, required: true},
    beds: [BedSchema],
    floor: {type: Number, required: true, default: 1}
});

var CottageSchema = new Schema({
    id: ObjectId,
    name: {type: String, required: true},
    rooms: [RoomSchema],
    floors: {type: Number, required: true, default: 1}
});

var PropertySchema = new Schema({
    id: ObjectId,
    name: {type: String, required: false, trim: true},
    description: {type: String, required: false, trim: true},
    admins: [Number],
    cottages: [CottageSchema],
    address: {
        streetAddress: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        zip: {type: String, required: true},
        country: {type: String, required: true, enum: ['US', 'Canada']}
    },
    community: {type: String, required: true}
});

var PropertyModel = mongoose.model('Property', PropertySchema);

module.exports = {
    addProperty: function(name, description, address, community, callback) {
        var newProperty = PropertyModel.create({
            name: name, 
            description: description, 
            address: address, 
            community: community,
            admins: [123] //JUST A TEST
        }, callback);
    },
    listProperties: function(community, adminId, callback) {
        PropertyModel.find({community: community, admins: adminId}, callback);
    },
    model: PropertyModel
};
