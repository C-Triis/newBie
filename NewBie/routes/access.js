"use strict";

const express = require('express');
const router = express.Router({});
const AccesController = require('../controllers/accesController.js');
const BrandController = require('../controllers/brandController.js');

const multer = require("multer");
const fileService = require('../services/fileService.js');
const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("/list", (req, res) => {
    AccesController.getList().then(rs =>{
      BrandController.getListBrand().then((brandList)=>{
        res.render("pages/admin/index", {
            acces: rs,
            brand: brandList,
            
        })
    })
    })
  });
  router.get("/home", (req, res) => {
    AccesController.getList().then(rs =>{
        res.render("pages/auth/acces_user", {
            acces: rs,
        })
    })
  });

router.post("/add", AccesController.addAcces);
router.get("/detail/:id", AccesController.getAccesDetail);
router.post("/upload-image", upload.single("file"), fileService.uploadFile);
router.post("/edit", AccesController.editAcces);
router.delete("/delete/:id", AccesController.DeleteAcces);



module.exports = router;