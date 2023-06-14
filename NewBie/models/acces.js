"use strict";
const mongoose = require('mongoose');

//khai báo Collection 
const Acces = mongoose.Schema(
    {
        accesId: { type: Number },
        img_acces: { type:String },
        des_acces: { type:String},
        accesName: { type:String},
    },
    {versionKey: false, timestamps: true}
);

Acces.statics.objectId = function(id) {
    return mongoose.Types.ObjectId(id);
};

//xuất Acces
module.exports = {
    Acces: mongoose.model("acces", Acces)
};