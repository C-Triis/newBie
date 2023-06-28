"use strict";

const express = require('express');
const router = express.Router({});
const ProductController = require('../controllers/productController.js');
const BrandController = require('../controllers/brandController.js');
const AccesController = require('../controllers/accesController.js');
// router.get('/list', ProductController.getList);
router.get("/list", (req, res) => {
    let page = req.query.page;
    let keySearch = req.query.keySearch;
    if (!page || parseInt(page) <= 0) {
        page = 1;
    }
    ProductController.getList(page, keySearch).then(rs =>{
        BrandController.getListBrand().then((brandList)=>{
           AccesController.getListAcces().then((accesList)=>{
                res.render("pages/admin/index", {
                    products: rs,
                    brand: brandList,
                    acces: accesList
                })
            });
        });
        
    })
});

router.post("/add", ProductController.addProduct);
router.get("/detail/:id", ProductController.getProductDetail);
router.post("/edit", ProductController.editProduct);
router.delete("/delete/:id", ProductController.DeleteProduct)


module.exports = router;