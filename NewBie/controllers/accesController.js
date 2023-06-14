"use strict";
const Acces = require('../models/acces.js').Acces
function AccesController() {
    const SELF = {
      SIZE: 5,
    };
    return{
        getList: (page, keySearch) => {
          try {
            let skip = (parseInt(page) - 1) * SELF.SIZE;
            let regex = new RegExp(keySearch);
            return Acces.find()
              .skip(skip)
              .limit(SELF.SIZE)
              .then((rs) => {
                return rs
              })
              .catch((error) => {
              });
          } catch (error) {
            console.log(error);
          }
          },
          addAcces: (req, res) => {
            try {
              let data = req.body;
              console.log(data);
              return Acces.create(data)
                .then((rs) => {
                  return res.redirect("/acces/list");
                })
                .catch((err) => {
                  res.send({ s: 400, msg: err });
                });
            } catch (error) {
              console.log(error);
            }
          },
          getListDB: () => {
            try {
              return new Promise((resolve, reject) => {
                Acces.find()
                  .then((rs) => {
                    resolve(rs);
                  })
                  .catch((err) => {
                    console.log(err);
                    reject(err);
                  });
              });
            } catch (error) {
              console.log(error);
            }
          },
          getAccesDetail: async (req, res) => {
            try {
              let accesId = req.params?.id;
              let accesInfo = await Product.findById(accesId);
              if (!accesInfo) {
                return res.json({ s: 404, msg: "acces not found" });
              }
              return res.json({ s: 200, data: accesInfo });
            } catch (error) {
              console.log(error);
            }
          },
          editAcces: async (req, res) => {
            try {
              let data = req.body;
              let accesInfo = await Acces.findById(data?._id);
              if (!accesInfo) {
                return res.json({ s: 404, msg: "acces not found" });
              }
              delete data._id;
              return Acces.findByIdAndUpdate(accesInfo._id, data)
                .then((rs) => {
                  if (rs) {
                    res.redirect("/acces/list");
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } catch (error) {
              console.log(error);
            }
          },
          DeleteAcces: async (req, res) => {
            try {
              console.log("qưe");
              const accesId = req.params?.id;
              console.log(accesId);
              const accesInfo = await Acces.findById(accesId);
              if (!accesInfo) {
                return res.json({ s: 404, msg: "Acces not found" });
              }
              Acces.deleteOne({ _id: accesId })
                .then((rs) => {
                  console.log(rs);
                  return res.json({ s: 200, msg: "Delete Acces success!!" });
                })
                .catch((e) => {
                  console.log(`DeleteAcces - fail: ${e}`);
                  return rs.json({ s: 400, msg: "Delete Acces fail" });
                });
            } catch (error) {
              console.log(error);
            }
          },
          
    }
}

//xuất ProductController
module.exports = new AccesController();