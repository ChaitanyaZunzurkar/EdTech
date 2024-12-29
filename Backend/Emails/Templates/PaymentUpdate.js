const paymentUpdateEmail = (userName, transactionId, amount, paymentStatus) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        .header { background-color: #4caf50; color: white; text-align: center; padding: 10px; }
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
        <p>We wanted to update you about your recent payment:</p>
        <ul>
            <li><strong>Transaction ID:</strong> ${transactionId}</li>
            <li><strong>Amount:</strong> $${amount}</li>
            <li><strong>Status:</strong> ${paymentStatus}</li>
        </ul>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Thank you for choosing StudyNotion!</p>
        <div class="footer">
            &copy; ${new Date().getFullYear()} StudyNotion. All rights reserved.
        </div>
    </div>
</body>
</html>
`;

module.exports = paymentUpdateEmail;
