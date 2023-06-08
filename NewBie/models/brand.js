"use strict";
const mongoose = require('mongoose');

//khai báo Collection 
const Brand = mongoose.Schema(
    {
        brandName: { type: String },
        img: { type:String },
        price: { type: String },
        percent: { type: Number},
        des: { type: String }
    },
    {versionKey: false, timestamps: true}
);

Brand.statics.objectId = function(id) {
    return mongoose.Types.ObjectId(id);
};

//xuất Brand
module.exports = {
    Brand: mongoose.model("brand", Brand)
};