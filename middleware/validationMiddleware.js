import {body, param, validationResult} from "express-validator";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import { JOB_STATUSES, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              const errorMessages = errors.array().map((error) => error.msg);
              if (errorMessages[0].startsWith("Job not")) {
                throw new NotFoundError(errorMessages);
              }
              if(errorMessages[0].startsWith("You are not authorized")){throw new UnauthorizedError(errorMessages);}
                throw new BadRequestError(errorMessages);
            }
            next();
        },
    ];
}

export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('company is required'), 
  body('position').notEmpty().withMessage('position is required'), 
  body('jobLocation').notEmpty().withMessage('job location is required'), 
  body('jobStatus').isIn(Object.values(JOB_STATUSES)).withMessage('invalid status value'), 
  body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid type value'), 
]);

export const validateIdParam = withValidationErrors([param('id').custom
  (async(value,{req}) => {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) throw new BadRequestError("invalid MongoDB id");
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`Job not found with id ${value}`);
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner) throw new UnauthorizedError("You are not authorized to perform this action");
    })
]);

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required').isLength({ min: 2 }).withMessage('name must be at least 2 characters'),
  body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format').custom(async (email) => {
    const user = await User.findOne({email});
    if (user) {
      throw new BadRequestError('email already exists');
    }
  }),
  body('password').notEmpty().withMessage('password is required').isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
  body('location').notEmpty().withMessage('location is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
]);

export const validateLoginInput = withValidationErrors([
 body("email").notEmpty().withMessage("email is required").isEmail().withMessage("invalid email format"),
 body("password").notEmpty().withMessage("password is required")
]);

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required').isLength({ min: 2 }).withMessage('name must be at least 2 characters'),
  body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format').custom(async (email,{req}) => {
    const user = await User.findOne({email});
    if (user && user._id.toString() !== req.user.userId) {
      throw new BadRequestError('email already exists');
    }
  }),
  body('location').notEmpty().withMessage('location is required'),
  body('lastName').notEmpty().withMessage('last name is required')
])
