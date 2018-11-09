import mongoose from 'mongoose';
import { Router }  from 'express';
import Foodtruck from '../model/foodtruck';
import Review from '../model/review';
import { authenticate } from "../middleware/authMiddleware";

export default ({
    config,
    db
}) => {
    let api = Router();

    //CRUD = CREATE READ UPDATE DELETE

    //'/v1/Foodtruck/add' ==> Create
    api.post('/add', authenticate, (req, res) => {
        let newfoodTruck = new Foodtruck();
        newfoodTruck.name = req.body.name;
        newfoodTruck.foodtype = req.body.foodtype;
        newfoodTruck.avgcost = req.body.avgcost;
        newfoodTruck.geometry.coordinates = req.body.geometry.coordinates;

        newfoodTruck.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({
                message: 'Foodtruck saved successfully'
            });
        });
    });

    //'v1/Foodtruck/' ==> Read
    api.get('/',(req, res) => {

        Foodtruck.find({}, (err, foodtruck) => {
            if (err) {
                res.send(err);
            }
            res.json(foodtruck);
        });
    });

    //''v1/foodtruck/:id' ==> read w/param
    api.get('/:id', (req, res) => {
        Foodtruck.findById(req.params.id, (err, foodtruck) => {
            if (err) {
                res.send(err);
            }
            res.json(foodtruck);
        });
    });

    //'v1/foodtruck/:id' => update
    api.put('/:id', authenticate, (req, res) => {
        Foodtruck.findById(req.params.id, (err, foodtruck) => {
            if (err) {
                res.send(err);
            }
            foodtruck.name = req.body.name;
            foodtruck.save(err => {
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
    api.delete('/:id', authenticate, (req, res) => {
        Foodtruck.remove({
            _id: req.params.id
        }, (err, foodtruck) => {
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
    api.post('/reviews/add/:id', authenticate, (req, res) => {
        Foodtruck.findById(req.params.id, (err, foodtruck) => {
            if (err) {
                res.send(err);
            }
            let newReview = new Review();

            newReview.title = req.body.title;
            newReview.text = req.body.text;
            newReview.foodtruck = foodtruck._id;
            newReview.save((err, review) => {
                if (err) {
                    res.send(err);
                }
                foodtruck.reviews.push(newReview);
                foodtruck.save(err => {
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
    api.get('/reviews/:id', (req, res) => {
        Review.find({
            foodtruck: req.params.id
        }, (err, review) => {
            if (err) {
                res.send(err);
            }
            res.json(review);
        });
    });

    return api;
};