const express = require('express');
const controller = require('');
const LifeHack = require('');
const HackSteps = require('');
const UserValidation = require('');
const AuthenticateToken = require('');

const router = express.Router();

router.post('/auth/signup', UserValidation.userInput, controller.createUser);
router.post('/auth/signin', UserValidation.userLogin, controller.login);

router.route('/users').get(AuthenticateToken, controller.getAllUsers);

router.route('/users/:id').get(AuthenticateToken, controller.getAUser);

router
  .route('/profile/guides')
  .get(AuthenticateToken, (req, res) => controller.getByType(req, res, true));

router
  .route('/profile/users')
  .get(AuthenticateToken, (req, res) =>
    controller.getByType(req, res, 'users')
  );

router
  .route('/lifehack')
  .get(AuthenticateToken, LifeHack.getLifeHacks)
  .post(
    AuthenticateToken,
    UserValidation.lifehackValidation,
    LifeHack.createLifeHack
  );
router
  .route('/lifehack/:id')
  .get(AuthenticateToken, LifeHack.getOneHack)
  .put(
    AuthenticateToken,
    UserValidation.lifehackValidation,
    LifeHack.updateHack
  )
  .delete(AuthenticateToken, LifeHack.deleteHack);

router.route('/steps').get(AuthenticateToken, HackSteps.getSteps);
router
  .route('/step/:id/lifehack')
  .get(AuthenticateToken, HackSteps.getStepsForASingleHack)
  .post(
    AuthenticateToken,
    UserValidation.stepsValidation,
    HackSteps.createStep
  );

router
  .route('/steps/:id')
  .get(AuthenticateToken, HackSteps.getStepById)
  .put(AuthenticateToken, UserValidation.stepsValidation, HackSteps.updateStep)
  .delete(AuthenticateToken, HackSteps.deleteStep);

router
  .route('/review/:id/lifehack')
  .post(
    AuthenticateToken,
    UserValidation.reviewsValidation,
    LifeHack.createReviews
  );

router.route('/save/:id/lifehack').post(AuthenticateToken, LifeHack.saveHacks);

router.route('/reviews').get(AuthenticateToken, LifeHack.getAllReviews);

module.exports = router;