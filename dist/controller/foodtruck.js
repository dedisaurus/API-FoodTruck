'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _foodtruck = require('../model/foodtruck');

var _foodtruck2 = _interopRequireDefault(_foodtruck);

var _review = require('../model/review');

var _review2 = _interopRequireDefault(_review);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    //CRUD = CREATE READ UPDATE DELETE

    //'/v1/Foodtruck/add' ==> Create
    api.post('/add', _authMiddleware.authenticate, function (req, res) {
        var newfoodTruck = new _foodtruck2.default();
        newfoodTruck.name = req.body.name;
        newfoodTruck.foodtype = req.body.foodtype;
        newfoodTruck.avgcost = req.body.avgcost;
        newfoodTruck.geometry.coordinates = req.body.geometry.coordinates;

        newfoodTruck.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({
                message: 'Foodtruck saved successfully'
            });
        });
    });

    //'v1/Foodtruck/' ==> Read
    api.get('/', _authMiddleware.authenticate, function (req, res) {

        _foodtruck2.default.find({}, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }
            res.json(foodtruck);
        });
    });

    //''v1/foodtruck/:id' ==> read w/param
    api.get('/:id', function (req, res) {
        _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }
            res.json(foodtruck);
        });
    });

    //'v1/foodtruck/:id' => update
    api.put('/:id', function (req, res) {
        _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }
            foodtruck.name = req.body.name;
            foodtruck.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({
                    message: "foodtruck data has been update"
                });
            });
        });
    });

    //'v1/foodtruck/:id' => delete
    api.delete('/:id', function (req, res) {
        _foodtruck2.default.remove({
            _id: req.params.id
        }, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }
            res.json({
                message: "foodtruck succesfully remove"
            });
        });
    });

    //add review for specific foodtruck id
    //'/v1/foodtruck/reviews/add/:id'
    api.post('/reviews/add/:id', function (req, res) {
        _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }
            var newReview = new _review2.default();

            newReview.title = req.body.title;
            newReview.text = req.body.text;
            newReview.foodtruck = foodtruck._id;
            newReview.save(function (err, review) {
                if (err) {
                    res.send(err);
                }
                foodtruck.reviews.push(newReview);
                foodtruck.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    res.json({
                        message: "reviews succcessfully saved"
                    });
                });
            });
        });
    });

    //get reviews for a specific food truck id
    // '/v1/foodtruck/reviews/:id'
    api.get('/reviews/:id', function (req, res) {
        _review2.default.find({
            foodtruck: req.params.id
        }, function (err, review) {
            if (err) {
                res.send(err);
            }
            res.json(review);
        });
    });

    return api;
};
//# sourceMappingURL=foodtruck.js.map