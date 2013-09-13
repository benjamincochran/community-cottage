var mongoose = require("../routes/db").mongoose,
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var BedSchema = new Schema({
    capacity: {type: Number, required: true, enum: [1, 2]}
});

var RoomSchema = new Schema({
    name: {type: String, required: true},
    beds: [BedSchema],
    floor: {type: Number, required: true, default: 1}
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
var RoomModel = mongoose.model('Room', RoomSchema);

var CottageSchema = new Schema({
    name: {type: String, required: true},
    rooms: [RoomSchema],
    floors: {type: Number, required: true, default: 1, min: 1}
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
CottageSchema.virtual("floorArray").get(function() {
    return new Array(this.get('floors'));
});
var CottageModel = mongoose.model('Cottage', CottageSchema);

var PropertySchema = new Schema({
    name: {type: String, required: false, trim: true},
    description: {type: String, required: false, trim: true},
    admins: [Number],
    cottages: [CottageSchema],
    address: {
        streetAddress: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        zip: {type: String, required: true},
        country: {type: String, required: true, enum: ['US', 'Canada']},
        phone: {type: String, required: false}
    },
    community: {type: String, required: true}
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
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
        PropertyModel.find({community: community, admins: adminId}, 'name description address', callback);
    },
    model: PropertyModel
};
