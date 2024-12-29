const courseEnrollmentEmail = (userName, courseName, courseLink) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        .header { background-color: #1e90ff; color: white; text-align: center; padding: 10px; }
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
        <p>Congratulations on enrolling in <strong>${courseName}</strong>!</p>
        <p>We’re excited to have you on board. Here’s what you can do next:</p>
        <ul>
            <li>Access your course materials on your dashboard.</li>
            <li>Join our community forums for support and discussions.</li>
        </ul>
        <p>Start your learning journey <a href="${courseLink}" style="color: #1e90ff;">here</a>.</p>
        <p>Happy Learning!</p>
        <div class="footer">
            &copy; ${new Date().getFullYear()} StudyNotion. All rights reserved.
        </div>
    </div>
</body>
</html>
`;

module.exports = courseEnrollmentEmail;
