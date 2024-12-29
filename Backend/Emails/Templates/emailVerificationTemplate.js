const emailVerificationTemplate = (userName, verificationLink) => `
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
        <p>Dear ${userName},</p>
        <p>Thank you for signing up with StudyNotion. Please verify your email address to get started:</p>
        <p style="text-align: center;">
            <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #f39c12; color: white; text-decoration: none; border-radius: 4px;">Verify Email</a>
        </p>
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
