const User = require('../models/User');

exports.forgotPassword = async (req,res,next) => {
  try {
    const { email } = req.body;
    if(!email) return res.status(400).json({ error: 'Email required' });

    const user = await User.findOne({ email });
    if(!user) return res.status(404).json({ error: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOTP = otp;
    user.resetOTPExpires = Date.now() + 10*60*1000;
    await user.save();

    console.log(`DEBUG OTP for ${email}: ${otp}`);
    res.json({ message: 'OTP generated and saved. Implement email sending.' });
  } catch (err) { next(err); }
};

exports.resetPassword = async (req,res,next) => {
  try {
    const { email, otp, newPassword } = req.body;
    if(!email || !otp || !newPassword) return res.status(400).json({ error: 'Missing fields' });

    const user = await User.findOne({ email, resetOTP: otp, resetOTPExpires: { $gt: Date.now() } });
    if(!user) return res.status(400).json({ error: 'Invalid or expired OTP' });

    user.password = newPassword;
    user.resetOTP = undefined;
    user.resetOTPExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) { next(err); }
};
