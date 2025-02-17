import mongoose from 'mongoose';
import { JOB_STATUSES,JOB_TYPE } from '../utils/constants.js';

const JobSchema = new mongoose.Schema({
  company: String,
  position: String,
  jobStatus: {
    type: String,
    enum: Object.values(JOB_STATUSES),
    default: JOB_STATUSES.PENDING,
  },
  jobType: {
    type: String,
    enum: Object.values(JOB_TYPE),
    default: JOB_TYPE.FULL_TIME,
  },
  jobLocation: {
    type: String,
    default: "my city",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},
{timestamps: true});

export default mongoose.model("Job", JobSchema);