const emailVerificationTemplate = (otp) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        .header { background-color: #f39c12; color: white; text-align: center; padding: 10px; }
        .footer { margin-top: 20px; font-size: 12px; text-align: center; color: gray; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>StudyNotion</h1>
            <p>Your Learning, Simplified</p>
        </div>
        <p>Thank you for signing up with StudyNotion. To verify your email, please use the following OTP (One-Time Password):</p>
        <p style="text-align: center; font-size: 24px; font-weight: bold; color: #f39c12;">${otp}</p>
        <p>Enter this OTP on the verification page to activate your account.</p>
        <p>If you didn’t create an account, please ignore this email.</p>
        <p>Thank you!</p>
        <div class="footer">
            &copy; ${new Date().getFullYear()} StudyNotion. All rights reserved.
        </div>
    </div>
</body>
</html>
`;

module.exports = emailVerificationTemplate;
