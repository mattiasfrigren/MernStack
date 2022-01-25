const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//item model
const Item = require('../../models/item');

//@route GET api/items
//@desc Get all items
//@access Public
router.get('/', (req,res) =>{
    Item.find()
    .sort({date: -1})
    .then(items => res.json(items));
});

//@route Post api/items
//@desc Create item
//@access private
router.post('/',auth, (req,res) =>{

    const newItem = new Item({
        name : req.body.name,
    });

    newItem.save().then(item => res.json(item));
});

//@route Delete api/items
//@desc Delete item
//@access Private
router.delete('/:id',auth, (req,res) =>{
    Item.findById(req.params.id).then(item => item.remove().then(() =>res.json ({success : true})))
    .catch(err => res.status(400).json({success: err}));

});




module.exports = router;