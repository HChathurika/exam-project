const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },       // e.g., Toyota
  model: { type: String, required: true },      // e.g., Corolla
  availability: {
    isAvailable: { type: Boolean, required: true },
    renter: { type: String },                   // who borrowed/rented the car
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true }
}, { timestamps: true });

// add virtual field id
carSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  }
});

module.exports = mongoose.model('Car', carSchema);

