import * as mongoose from 'mongoose';
export const accoundSchema = new mongoose.Schema({
  QrCode: {
    type: String,
    required: true,
  },
  upi_Id: {
    type: String,
    required: true,
  },
  which_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_tbs',
    required: true,
  },
});
export class accountModel {
  constructor(public QrCode: string, public upi_Id: string) {
    this.QrCode = QrCode;
    this.upi_Id = upi_Id;
  }
}
